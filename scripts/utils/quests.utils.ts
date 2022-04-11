import * as dotenv from 'dotenv';
import { BigNumber, ethers } from 'ethers';
import { cp } from 'fs';
import questBoardABI from '../../abi/QuestBoard.json';
import { WARDEN_QUEST_CONTRACT_ADRESS } from '../constants/gauge.constants';
import { Quest } from '../dto/quest';

dotenv.config()
const provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_URI);
 
export const createQuest = async () => {
    const questBoardContract:ethers.Contract = new ethers.Contract(WARDEN_QUEST_CONTRACT_ADRESS, questBoardABI, provider);
    const period = await questBoardContract.currentPeriod();
    const gauge = '0x1cEBdB0856dd985fAe9b8fEa2262469360B8a3a6';
    const rewardToken = '0xD533a949740bb3306d119CC777fa900bA034cd52';
    const objectiveSlope = BigNumber.from("150000000000000000");
    const rewardPerSlopePoint  = BigNumber.from("600000");
    const rewardAmountPerPeriod = BigNumber.from("90000000000000000000000");
    console.log(await questBoardContract.createQuest(gauge, rewardToken, 1, objectiveSlope, rewardPerSlopePoint, rewardAmountPerPeriod, BigNumber.from(0)))
}

export const getQuestFromId = async (questId: string):Promise<Quest> => {
    let quest:Quest ={
        questID: BigNumber.from(questId),
        gauge: "0xF98450B5602fa59CC66e1379DFfB6FDDc724CfC4",
        startPeriod: BigNumber.from(1639612800),
        objectiveVotes: BigNumber.from("0x06da4bd219e99a12b0e380"),
        rewardPerVote: BigNumber.from(12)
    } as Quest

    return quest;
}

export const getQuestsFromPeriod = async (period:BigNumber):Promise<Quest[]> => {
    const questBoardContract:ethers.Contract = new ethers.Contract(WARDEN_QUEST_CONTRACT_ADRESS, questBoardABI, provider);
    //const questsFromContract = await questBoardContract["quests()"]()
    let quests:Quest[] = []

    for(let i=0; i<2; i++){
        quests.push({
            questID: BigNumber.from(i),
            gauge: "0xF98450B5602fa59CC66e1379DFfB6FDDc724CfC4",
            startPeriod: BigNumber.from(1639612800),
            objectiveVotes: BigNumber.from("0x06da4bd219e99a12b0e380"),
            rewardPerVote: BigNumber.from(600000)
        } as Quest)
    }

    return quests;
}

/**
 * Test
 */
/*const test = async () => {
    const questBoardContract:ethers.Contract = new ethers.Contract(WARDEN_QUEST_CONTRACT_ADRESS, questBoardABI, provider);
    const periods = await questBoardContract.getAllPeriodsForQuestId(BigNumber.from(1));
    console.log(periods)
    const period:BigNumber = await questBoardContract.currentPeriod();
    console.log(period.toString())
    //await getQuestsFromPeriod(period);
}

test();*/