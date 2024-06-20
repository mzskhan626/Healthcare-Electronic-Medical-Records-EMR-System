'use client'

import { useState } from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Typography,
  Row,
  Col,
} from 'antd'
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AppointmentSchedulingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const appointmentValues: Partial<Model.Appointment> = {
        dateTime: dayjs(values.dateTime).toISOString(),
        status: 'scheduled',
        notes: values.notes,
        patientId: values.patientId,
        providerId: userId,
      }
      await Api.Appointment.createOneByProviderId(userId, appointmentValues)
      enqueueSnackbar('Appointment scheduled successfully', {
        variant: 'success',
      })
      router.push('/appointments')
    } catch (error) {
      enqueueSnackbar('Failed to schedule appointment', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>Schedule an Appointment</Title>
          <Paragraph>
            As a healthcare provider, you can schedule an appointment for a
            patient to manage their visit times.
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="patientId"
              label="Patient ID"
              rules={[
                { required: true, message: 'Please input the patient ID!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Patient ID" />
            </Form.Item>
            <Form.Item
              name="dateTime"
              label="Appointment Date & Time"
              rules={[
                { required: true, message: 'Please select the date and time!' },
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                style={{ width: '100%' }}
                prefix={<CalendarOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="notes"
              label="Notes"
              rules={[{ required: true, message: 'Please input the notes!' }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Notes"
                prefix={<FileTextOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Schedule Appointment
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}
