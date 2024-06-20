'use client'

import { useEffect, useState } from 'react'
import { Typography, Input, Table, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Search } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function PatientListPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [patients, setPatients] = useState<Model.Patient[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true)
      try {
        const patientsFound = await Api.Patient.findMany({
          includes: ['medicalHistorys', 'appointments', 'prescriptions'],
        })
        setPatients(patientsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch patients', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  const handleSearch = async (value: string) => {
    setLoading(true)
    try {
      const patientsFound = await Api.Patient.findMany({
        filters: {
          or: [
            { firstName: { ilike: `%${value}%` } },
            { lastName: { ilike: `%${value}%` } },
            { id: { ilike: `%${value}%` } },
          ],
        },
        includes: ['medicalHistorys', 'appointments', 'prescriptions'],
      })
      setPatients(patientsFound)
    } catch (error) {
      enqueueSnackbar('Failed to search patients', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Contact Info',
      dataIndex: 'contactInfo',
      key: 'contactInfo',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Space
        direction="vertical"
        style={{ width: '100%', textAlign: 'center' }}
      >
        <Title level={2}>Patient List</Title>
        <Text>View and manage your patient database</Text>
        <Search
          placeholder="Search by name or ID"
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          loading={loading}
        />
        <Table
          dataSource={patients}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Space>
    </PageLayout>
  )
}
