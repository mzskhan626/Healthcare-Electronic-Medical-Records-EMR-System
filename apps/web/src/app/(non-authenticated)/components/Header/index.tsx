import { Flex, Image, Typography } from 'antd'
import React from 'react'

const { Text, Title } = Typography

type Props = {
  title?: string
  description?: string
}

export const Header: React.FC<Props> = ({
  title = 'Healthcare Electronic Medical Records  EMR  System',
  description,
}) => {
  return (
    <>
      <Flex justify="center">
        <Image
          height={100}
          width={100}
          preview={false}
          src="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/B6iIod-healthcareelectronicmedicalrecordsemrsystem-d1Q7"
        />
      </Flex>

      <Flex vertical align="center">
        <Title level={3} style={{ margin: 0 }}>
          {title}
        </Title>
        {description && <Text type="secondary">{description}</Text>}
      </Flex>
    </>
  )
}
