import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){

    const { goBack } = useNavigation();

    function handleNavigateBack(){
        goBack();
    }

    return(
        <View style={styles.container}>
            <ImageBackground resizeMode="contain" style={styles.content} source={giveClassesBgImage}>
                <Text style={styles.title}>Quer ser um Proffy? </Text>
                <Text style={styles.description}>Para começar,
                    você precisa se cadastrar na plataforma WEB
                </Text>               
            </ImageBackground>

            <RectButton style={styles.okButton} onPress={handleNavigateBack}>
                <Text style={styles.okButtonText}>Tudo Bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;