'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, Form, Select, Spin, Row, Col, Card } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AppointmentDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [appointment, setAppointment] = useState<Model.Appointment | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [updating, setUpdating] = useState<boolean>(false)

  const fetchAppointmentDetails = async () => {
    try {
      const appointmentData = await Api.Appointment.findOne(
        params.appointmentId,
        { includes: ['patient', 'provider'] },
      )
      setAppointment(appointmentData)
    } catch (error) {
      enqueueSnackbar('Failed to fetch appointment details', {
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (status: string) => {
    setUpdating(true)
    try {
      await Api.Appointment.updateOne(params.appointmentId, { status })
      enqueueSnackbar('Appointment status updated successfully', {
        variant: 'success',
      })
      fetchAppointmentDetails()
    } catch (error) {
      enqueueSnackbar('Failed to update appointment status', {
        variant: 'error',
      })
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    fetchAppointmentDetails()
  }, [params.appointmentId])

  if (loading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Appointment Details</Title>
      <Paragraph>View and update the details of the appointment.</Paragraph>
      {appointment && (
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={4}>Patient Information</Title>
              <Text>
                <strong>Name:</strong> {appointment.patient?.firstName}{' '}
                {appointment.patient?.lastName}
              </Text>
              <br />
              <Text>
                <strong>Date of Birth:</strong>{' '}
                {dayjs(appointment.patient?.dateOfBirth).format('YYYY-MM-DD')}
              </Text>
              <br />
              <Text>
                <strong>Contact Info:</strong>{' '}
                {appointment.patient?.contactInfo}
              </Text>
              <br />
              <Text>
                <strong>Address:</strong> {appointment.patient?.address}
              </Text>
              <br />
            </Col>
            <Col span={24}>
              <Title level={4}>Appointment Information</Title>
              <Text>
                <strong>Date and Time:</strong>{' '}
                {dayjs(appointment.dateTime).format('YYYY-MM-DD HH:mm')}
              </Text>
              <br />
              <Text>
                <strong>Status:</strong> {appointment.status}
              </Text>
              <br />
              <Text>
                <strong>Notes:</strong> {appointment.notes}
              </Text>
              <br />
            </Col>
            <Col span={24}>
              <Form layout="inline">
                <Form.Item label="Update Status">
                  <Select
                    defaultValue={appointment.status}
                    onChange={handleStatusChange}
                    disabled={updating}
                  >
                    <Option value="upcoming">Upcoming</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="cancelled">Cancelled</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    icon={updating ? <Spin /> : <CheckCircleOutlined />}
                    onClick={() =>
                      handleStatusChange(appointment.status || 'upcoming')
                    }
                    disabled={updating}
                  >
                    Update Status
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      )}
    </PageLayout>
  )
}
