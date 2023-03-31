import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { CgTrash } from "react-icons/cg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RemoveAllSelections } from "../../../redux/slices/BetSlip-slice";
import BetSlipGame from "./BetSlipGame";
import Parlay from "./Parlay";
import {
    useCreateBetsMutation,
    useCreateParlayMutation,
    useGetUserQuery,
    useUpdateUserFundsMutation,
} from "../../../redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
//this is for our order confirmation page
import { useRouter } from "next/router";

const BetSlipConntainer = styled.div`
    @media only screen and (min-width: 360px) {
        display: flex;
        flex-direction: column;
        bottom: 0;
        position: sticky;
        margin-top: 15%;
        background-color: #c0c0c0;
        margin-left: 0.5em;
        margin-right: 0.5em;
        border-radius: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
        transition: 0.3s;
        transform: ${({ open }) =>
            open ? "translateY(-5%)" : "translateY(-80%)"};
        height: ${({ open }) => (open ? "35em" : "3em")};
        color: black;

        ::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    @media only screen and (min-width: 850px) {
        justify-self: flex-end;
        width: 100%;
        margin-top: 0;
        margin-left: 0;
        margin-right: 0;
        border-radius: 10px;
        overflow-y: scroll;
        transition: 0.3s;
        transform: translateY(-0%);
        height: 100% !important;
    }
`;

const BetSlipFooter = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    bottom: 0;
    position: sticky;
    background-color: #c0c0c0;
`;

const Submit = styled.button`
    background-color: #023020;
    color: white;
    width: 100%;
    border: none;
    height: 60px;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
`;

const ClearBets = styled.div`
    color: red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
    padding: 4%;
    background-color: #47474c;
    border-top: 1.5px solid black;
    border-bottom: 1px solid black;
`;

const BetSlipHeaderContainer = styled.div`
    @media only screen and (min-width: 300px) {
        top: 0;
        position: sticky;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid black;
        padding: 0.9em 0.25em;
        background-color: #c0c0c0;
        height: 3em;
    }
`;

function BetSlip() {
    const [wager, setWager] = useState("");
    const [toWin, setToWin] = useState("");
    const [parlayOdds, setOdds] = useState("");
    const [toggled, setToggled] = useState(false);
    const [totalWager, setTotalWager] = useState("");
    const { betSlip } = useSelector((state) => state.betSlip);
    const { data: session, status } = useSession();
    const { data: user, isSuccess } = useGetUserQuery(
        status === "authenticated" ? session.user.id : skipToken
    );
    const [createParlay] = useCreateParlayMutation();
    const [createBet] = useCreateBetsMutation();
    const [updateFunds] = useUpdateUserFundsMutation();

    const dispatch = useDispatch();

    const queryToggle = window.matchMedia("(min-width: 850px)");
    let desktopView = queryToggle.matches;
    
    //This is for our order confirmation page
    const router = useRouter();

    useEffect(() => {
        setTotalWager(0);
        betSlip.forEach((ele) => {
            // calculating total wager to send to store to subtract from funds on submit bet
            setTotalWager((oldState) => Number(oldState) + Number(ele.wager));
        });
    }, [betSlip]);

    const submitBets = async () => {
        let betsArr  = [];
        if (isSuccess) {
            if (user.balance < totalWager) {
                alert("NOT ENOUGH FUNDS");
            } else {
                try {
                    // first create the order for bets with createOrder mutation from apiSlice
                    // Then map through bets and create bets using createBet mutation
                    betSlip.forEach(async (bet) => {
                        // append orderId to each bet for association
                        betsArr.push(bet);
                        let myBet = { ...bet, userId: user.id };

                        // this not the real id so delete, new id will be appended through sequelize
                        delete myBet.id;
                        // create the bet if wager fields are greater than 0

                        !isNaN(myBet.wager)
                            ? await createBet(myBet)
                            : alert(
                                  "Enter a wager amount for " + myBet.gameLine
                              );
                    });
                    // update user funds after everything is successfull
                    await updateFunds({
                        funds: user.balance - totalWager,
                        id: user.id,
                    }).then(router.push({pathname: '/orderconfirmed', query: {data: JSON.stringify(betsArr)}}));
                    
                    // remove bets from slip
                    dispatch(RemoveAllSelections());
                } catch (error) {
                    alert(error);
                }
            }
        }
    };

    const submitParlay = async () => {
        if (isSuccess) {
            if (user.balance < wager) {
                alert("Please Deposit Funds");
            } else {
                try {
                    let { data: parlay } = await createParlay({
                        userId: user.id,
                        isActive: true,
                        wager: wager,
                        toWin: toWin,
                    });
                    betSlip.forEach(async (bet) => {
                        // append orderId to each bet for association
                        let myBet = {
                            ...bet,
                            userId: user.id,
                            parlayId: parlay.id,
                        };
                        // this not the real id so delete, new id will be appended through sequelize
                        delete myBet.id;
                        // create the bet if wager fields are greater than 0

                        await createBet(myBet);
                    });
                    await updateFunds({
                        funds: user.balance - wager,
                        id: user.id,
                    });
                    dispatch(RemoveAllSelections());
                } catch (error) {
                    alert(error);
                }
            }
        }
    };

    return (
        <BetSlipConntainer
            open={toggled || desktopView}
            style={
                betSlip.length <= 1
                    ? { height: `${toggled ? "40vh" : "3em"}` }
                    : { height: `${toggled ? "70vh" : "3em"}` }
            }
        >
            <BetSlipHeaderContainer onClick={() => setToggled(!toggled)}>
                {" "}
                <div className="closedBetslip">{betSlip.length}Bet Slip</div>
                {betSlip.length > 1 && (
                    <div className="closedBetslip">
                        Parlay Odds {parlayOdds}
                    </div>
                )}
            </BetSlipHeaderContainer>

            {(toggled || desktopView) && (
                <>
                    {/* mapping through bets and rendiner each individual slip */}
                    {betSlip.map((bet, idx) => {
                        return <BetSlipGame bet={bet} key={idx} />;
                    })}
                    <BetSlipFooter>
                        {" "}
                        <ClearBets
                            onClick={() => dispatch(RemoveAllSelections())}
                        >
                            <CgTrash color="red" />
                            Remove all Selections
                        </ClearBets>
                        {status === "authenticated" && (
                            <Submit onClick={() => submitBets()}>
                                Lock In Bet(s)
                            </Submit>
                        )}
                        {betSlip.length > 1 && (
                            <Parlay
                                toWin={toWin}
                                setToWin={setToWin}
                                wager={wager}
                                setWager={setWager}
                                parlayOdds={parlayOdds}
                                setOdds={setOdds}
                            />
                        )}
                        {status === "authenticated" ? (
                            betSlip.length > 1 && (
                                <Submit onClick={() => submitParlay()}>
                                    Lock In Parlay
                                </Submit>
                            )
                        ) : (
                            <Link href="/login">
                                <Submit>Log In to Place Bet</Submit>
                            </Link>
                        )}
                    </BetSlipFooter>
                </>
            )}
        </BetSlipConntainer>
    );
}

export default BetSlip;
