import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import EmptyBox from '~/components/EmptyBox';

import api from '~/services/api';

import { Container, Title, List } from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('/appointments');
      setLoading(false);
      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  async function handleCancel(id) {
    const response = await api.delete(`/appointments/${id}`);
    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? { ...appointment, canceled_at: response.data.canceled_at }
          : appointment
      )
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : appointments.length > 0 ? (
          <List
            data={appointments}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Appointment onCancel={() => handleCancel(item.id)} data={item} />
            )}
          />
        ) : (
          <EmptyBox icon="sentiment-neutral">
            Você ainda não possui agendamentos.
          </EmptyBox>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon size={20} name="event" color={tintColor} />
  ),
};
