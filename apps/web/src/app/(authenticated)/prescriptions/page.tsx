'use client'

import { useEffect, useState } from 'react'
import { Form, Input, Button, Space, Table, Modal, Typography } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function PrescriptionManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [prescriptions, setPrescriptions] = useState<Model.Prescription[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPrescription, setEditingPrescription] =
    useState<Model.Prescription | null>(null)

  useEffect(() => {
    if (userId) {
      Api.Prescription.findManyByProviderId(userId, { includes: ['patient'] })
        .then(setPrescriptions)
        .finally(() => setLoading(false))
    }
  }, [userId])

  const handleCreateOrUpdate = async (values: Partial<Model.Prescription>) => {
    try {
      if (editingPrescription) {
        await Api.Prescription.updateOne(editingPrescription.id, values)
        enqueueSnackbar('Prescription updated successfully', {
          variant: 'success',
        })
      } else {
        await Api.Prescription.createOneByProviderId(userId, values)
        enqueueSnackbar('Prescription created successfully', {
          variant: 'success',
        })
      }
      setIsModalVisible(false)
      setEditingPrescription(null)
      const updatedPrescriptions = await Api.Prescription.findManyByProviderId(
        userId,
        { includes: ['patient'] },
      )
      setPrescriptions(updatedPrescriptions)
    } catch (error) {
      enqueueSnackbar('An error occurred', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await Api.Prescription.deleteOne(id)
      enqueueSnackbar('Prescription deleted successfully', {
        variant: 'success',
      })
      setPrescriptions(prescriptions.filter(p => p.id !== id))
    } catch (error) {
      enqueueSnackbar('An error occurred', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Medication Name',
      dataIndex: 'medicationName',
      key: 'medicationName',
    },
    {
      title: 'Dosage',
      dataIndex: 'dosage',
      key: 'dosage',
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Patient',
      dataIndex: ['patient', 'firstName'],
      key: 'patient',
      render: (_: any, record: Model.Prescription) =>
        `${record.patient?.firstName} ${record.patient?.lastName}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Model.Prescription) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPrescription(record)
              setIsModalVisible(true)
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Prescription Management</Title>
      <Text>Manage prescriptions for your patients.</Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ margin: '20px 0' }}
      >
        Create Prescription
      </Button>
      <Table
        dataSource={prescriptions}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={
          editingPrescription ? 'Edit Prescription' : 'Create Prescription'
        }
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setEditingPrescription(null)
        }}
        footer={null}
      >
        <Form
          initialValues={editingPrescription || {}}
          onFinish={handleCreateOrUpdate}
          layout="vertical"
        >
          <Form.Item
            name="medicationName"
            label="Medication Name"
            rules={[
              { required: true, message: 'Please enter medication name' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dosage"
            label="Dosage"
            rules={[{ required: true, message: 'Please enter dosage' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="frequency"
            label="Frequency"
            rules={[{ required: true, message: 'Please enter frequency' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please enter start date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please enter end date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="patientId"
            label="Patient ID"
            rules={[{ required: true, message: 'Please enter patient ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingPrescription ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
