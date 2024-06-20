'use client'

import { useEffect, useState } from 'react'
import { List, Spin, Typography, Row, Col } from 'antd'
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
  const [loading, setLoading] = useState<boolean>(true)

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
          enqueueSnackbar('Failed to load appointments', { variant: 'error' })
          setLoading(false)
        })
    }
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2}>Scheduled Appointments</Title>
          <Paragraph>
            Manage your daily schedule by viewing all your scheduled
            appointments below.
          </Paragraph>
        </Col>
      </Row>
      {loading ? (
        <Row justify="center">
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={appointments}
          renderItem={appointment => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <CalendarOutlined
                    style={{ fontSize: '24px', color: '#1890ff' }}
                  />
                }
                title={
                  <Text>
                    {appointment.patient?.firstName}{' '}
                    {appointment.patient?.lastName}
                  </Text>
                }
                description={
                  <>
                    <Text>
                      {dayjs(appointment.dateTime).format(
                        'MMMM D, YYYY h:mm A',
                      )}
                    </Text>
                    <br />
                    <Text type="secondary">{appointment.notes}</Text>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </PageLayout>
  )
}
