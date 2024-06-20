'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  List,
  Card,
} from 'antd'
import { EditOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function PatientDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [patient, setPatient] = useState<Model.Patient | null>(null)
  const [medicalHistory, setMedicalHistory] = useState<Model.MedicalHistory[]>(
    [],
  )
  const [prescriptions, setPrescriptions] = useState<Model.Prescription[]>([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const patientData = await Api.Patient.findOne(params.patientId, {
          includes: ['medicalHistorys', 'prescriptions'],
        })
        setPatient(patientData)
        setMedicalHistory(patientData.medicalHistorys || [])
        setPrescriptions(patientData.prescriptions || [])
      } catch (error) {
        enqueueSnackbar('Failed to fetch patient details', { variant: 'error' })
      }
    }
    fetchPatientDetails()
  }, [params.patientId])

  const handleUpdatePatient = async (values: Partial<Model.Patient>) => {
    try {
      const updatedPatient = await Api.Patient.updateOne(
        params.patientId,
        values,
      )
      setPatient(updatedPatient)
      setIsEditing(false)
      enqueueSnackbar('Patient information updated successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to update patient information', {
        variant: 'error',
      })
    }
  }

  const handleAddMedicalHistory = async (
    values: Partial<Model.MedicalHistory>,
  ) => {
    try {
      const newMedicalHistory = await Api.MedicalHistory.createOneByPatientId(
        params.patientId,
        values,
      )
      setMedicalHistory([...medicalHistory, newMedicalHistory])
      enqueueSnackbar('Medical history added successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to add medical history', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Patient Details</Title>
      <Paragraph>
        Review and update patient information and medical history.
      </Paragraph>
      {patient && (
        <Form
          layout="vertical"
          initialValues={patient}
          onFinish={handleUpdatePatient}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstName">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" name="lastName">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gender" name="gender">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Contact Info" name="contactInfo">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            disabled={!isEditing}
          >
            Save
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </Form>
      )}
      <Divider />
      <Title level={3}>Medical History</Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={medicalHistory}
        renderItem={item => (
          <List.Item>
            <Card title={dayjs(item.dateCreated).format('YYYY-MM-DD')}>
              <p>
                <strong>Diagnosis:</strong> {item.diagnosis}
              </p>
              <p>
                <strong>Treatment:</strong> {item.treatment}
              </p>
              <p>
                <strong>Notes:</strong> {item.notes}
              </p>
            </Card>
          </List.Item>
        )}
      />
      <Form layout="vertical" onFinish={handleAddMedicalHistory}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Diagnosis" name="diagnosis">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Treatment" name="treatment">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Notes" name="notes">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Add Medical History
        </Button>
      </Form>
      <Divider />
      <Title level={3}>Prescriptions</Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={prescriptions}
        renderItem={item => (
          <List.Item>
            <Card title={item.medicationName}>
              <p>
                <strong>Dosage:</strong> {item.dosage}
              </p>
              <p>
                <strong>Frequency:</strong> {item.frequency}
              </p>
              <p>
                <strong>Start Date:</strong>{' '}
                {dayjs(item.startDate).format('YYYY-MM-DD')}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {dayjs(item.endDate).format('YYYY-MM-DD')}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
