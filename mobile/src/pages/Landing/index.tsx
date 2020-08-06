import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler'

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesImg from '../../assets/images/icons/give-classes.png';
import HeartIcon from '../../assets/images/icons/heart.png';

function Landing(){

    const { navigate } = useNavigation();

    function handleNavigateGiveClassesPage(){
        navigate('GiveClasses')
    }

    function handleNavigateToStudyPage(){
        navigate('Study');
    }

    return(
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImg} />
            
            <Text style={styles.title}>
            Seja Bem-vindo, {'\n'}
            <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton style={[styles.button, styles.buttonPrimary]}
                onPress={handleNavigateToStudyPage}>
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton style={[styles.button, styles.buttonSecondary]}
                onPress={handleNavigateGiveClassesPage}>
                    <Image source={giveClassesImg}/>
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de 205 conexões já realizadas {' '}
                <Image source={HeartIcon}/>
            </Text>
        </View>

    );
}

export default Landing;