'use client'

import { useEffect, useState } from 'react'
import { Typography, List, Avatar, Spin } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AppointmentListPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [appointments, setAppointments] = useState<Model.Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: ['appointmentsAsProvider', 'appointmentsAsProvider.patient'],
      })
        .then(user => {
          setAppointments(user.appointmentsAsProvider || [])
          setLoading(false)
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch appointments', { variant: 'error' })
          setLoading(false)
        })
    }
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Scheduled Appointments</Title>
      <Paragraph>
        View and manage your daily schedule of appointments.
      </Paragraph>
      {loading ? (
        <Spin size="large" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={appointments}
          renderItem={appointment => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<CalendarOutlined />} />}
                title={
                  <Text>
                    {dayjs(appointment.dateTime).format('MMMM D, YYYY h:mm A')}
                  </Text>
                }
                description={
                  <div>
                    <Text strong>Patient: </Text>
                    <Text>{`${appointment.patient?.firstName} ${appointment.patient?.lastName}`}</Text>
                    <br />
                    <Text strong>Status: </Text>
                    <Text>{appointment.status}</Text>
                    <br />
                    <Text strong>Notes: </Text>
                    <Text>{appointment.notes}</Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </PageLayout>
  )
}
