import { Table, Tag, Typography, Card } from 'antd';

import dayjs from 'dayjs';

import { useUserBids } from '../hooks/UserBidsHook';
import type { UserBid } from '../types';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export const MyBidsTable = () => {
  const { data, isLoading } = useUserBids();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Item',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: UserBid) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{text}</div>
          <Text type="secondary" >{record.brand}</Text>
        </div>
      ),
    },
    {
      title: 'Your Bid',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <Text strong>${price.toFixed(2)}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'isHighestBid',
      key: 'isHighestBid',
      render: (isHighest: boolean) => (
        <Tag color={isHighest ? 'green' : 'orange'}>
          {isHighest ? 'Highest Bidder' : 'Outbid'}
        </Tag>
      ),
    },
    {
      title: 'Bid Placed',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY HH:mm'),
      sorter: (a: any, b: any) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    },
    {
      title: 'Ends In',
      dataIndex: 'expiryTime',
      key: 'expiryTime',
      render: (date: string) => {
        const diff = dayjs(date).diff(dayjs(), 'day');
        return diff > 0 ? `${diff} days left` : <Text type="danger">Ended</Text>;
      },
    },
  ];

  return (
    <Card title="My Bidding History">
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        onRow={(record) => ({
          onClick: () => {
            navigate(`/items/${record.itemId}`);
          },
          className: 'cursor-pointer hover:bg-fresh-light/20 transition-colors'
        })}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          position: ['bottomCenter'],
        }}

      />
    </Card>
  );
};