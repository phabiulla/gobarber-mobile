import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import { Container, HoursList, Hour, Title } from './styles';

import api from '~/services/api';

export default function SelectDateTime({ navigation }) {
  const [tempo, setTempo] = useState([]);
  const [date, setDate] = useState(new Date());
  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailables() {
      const { id } = provider;
      const response = await api.get(`/providers/${id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setTempo(response.data);
    }

    loadAvailables();
  }, [date]);

  console.tron.warn(tempo);
  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
