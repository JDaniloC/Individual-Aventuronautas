import CompletedChallenges from '../components/CompletedChallenges';
import { ChallengesProvider } from '../contexts/ChallengeContext';
import ExperienceBar from '../components/ExperienceBar'
import MissionSelect from '../components/MissionSelect'
import FinishGame from '../components/FinishGame'
import Profile from '../components/Profile'

import { GetStaticProps } from 'next';
import Head from 'next/head';

import styles from "../styles/pages/Home.module.css";
import { serverURL } from '../config';
import axios from 'axios';

interface challenge {
  mission: number;
  title: string;
  icon: string;
  description: string;
}

interface HomeProps {
  missions: challenge[]
}

export default function Home(props: HomeProps) {  
  return (
    <ChallengesProvider>
      <div className={styles.container}>
        <Head>
          <title> Início | Aventura Espacial </title>
        </Head>

        <ExperienceBar />
        
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
          </div>
          <FinishGame />
        </section>

        <MissionSelect missions = {props.missions} />
      </div>
    </ChallengesProvider>
  )
}

export const getStaticProps:GetStaticProps = async (context) => {
  const response = await axios.get(serverURL + "/api/missions/")
  let missionArray = response.data.missions;
  if (missionArray === undefined) { missionArray = [] };

  return {
    props: {
      missions: missionArray
    },
    revalidate: 60
  }
}