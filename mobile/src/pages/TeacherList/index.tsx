import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView } from "react-native";
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather } from "@expo/vector-icons";

import styles from './styles';
import api from '../../services/api';

function TeacherList(){

    const [isFiltersVisible, setIsFiltersVisibile] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    // carregar os professores favoritados
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                });

                setFavorites(favoritedTeachersId);
            }
        });
    }

    function handleToggleFiltersVisible(){
        setIsFiltersVisibile(!isFiltersVisible);
    }

    async function handlefiltersSubmit(){

        loadFavorites();

        const response = await api.get(`classes`, {
            params: {
                subject,
                week_day,
                time
            }
        });

        setIsFiltersVisibile(false);
        setTeachers(response.data);

    }

    useFocusEffect(() => {
        loadFavorites();
    });

    return(
        <View style={styles.container}>
            <ScrollView style={styles.teacherList}
            contentContainerStyle={{
                paddingBottom: 16,
            }}>

                <PageHeader title="Proffys Disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color='#fff' />
                    </BorderlessButton>
                )}
                >
                { isFiltersVisible && (
                    <KeyboardAvoidingView style={styles.searchform}>
                        
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeek_day(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} 
                        onPress={handlefiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                </KeyboardAvoidingView>
                )}
            </PageHeader>

                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher}
                        favorited={favorites.includes(teacher.id)} 
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;