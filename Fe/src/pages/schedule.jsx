import React, { useEffect, useState, useContext } from 'react';
import { Table, Tag, Button, Select, Space, notification, Card } from 'antd';
import dayjs from 'dayjs';
import { getScheduleApi } from '../util/api';
import AuthContext from '../components/context/auth.context';

const { Option } = Select;

const SchedulePage = () => {
    const [data, setData] = useState([]);
    const [filterStatus, setFilterStatus] = useState("ALL");

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        const res = await getScheduleApi();

        if (res && !res.message) {
            setData(res);
        } else {
            notification.error({
                message: "Lỗi tải lịch",
                description: res?.message
            });
        }
    };

    const renderStatus = (status) => {
        const colorMap = {
            pending: 'orange',
            confirmed: 'green',
            cancelled: 'red',
            completed: 'blue'
        };

        return <Tag color={colorMap[status]}>{status.toUpperCase()}</Tag>;
    };

    const renderAction = (record) => {
        if (auth?.user?.role === 'PATIENT' && record.status === 'pending') {
            return (
                <Button danger>
                    Hủy
                </Button>
            );
        }

        if (auth?.user?.role === 'DOCTOR' && record.status === 'pending') {
            return (
                <Button type="primary">
                    Xác nhận
                </Button>
            );
        }

        return null;
    };

    const filteredData = filterStatus === "ALL"
        ? data
        : data.filter(item => item.status === filterStatus);

    const columns = [
        {
            title: 'Bệnh nhân',
            dataIndex: ['patientId', 'name'],
        },
        {
            title: 'Bác sĩ',
            dataIndex: ['doctorId', 'name'],
        },
        {
            title: 'Bắt đầu',
            render: (record) =>
                dayjs(record.startTime).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Kết thúc',
            render: (record) =>
                dayjs(record.endTime).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Trạng thái',
            render: (record) => renderStatus(record.status),
        },
        {
            title: 'Hành động',
            render: (record) => renderAction(record),
        },
    ];

    return (
        <div style={{ maxWidth: 1100, margin: '40px auto' }}>
            <Card title="Lịch khám của bạn" style={{ borderRadius: 10 }}>

                {/* FILTER */}
                <Space style={{ marginBottom: 20 }}>
                    <span>Lọc trạng thái:</span>
                    <Select
                        value={filterStatus}
                        onChange={setFilterStatus}
                        style={{ width: 200 }}
                    >
                        <Option value="ALL">Tất cả</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="confirmed">Confirmed</Option>
                        <Option value="cancelled">Cancelled</Option>
                        <Option value="completed">Completed</Option>
                    </Select>
                </Space>

                {/* TABLE */}
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="_id"
                    bordered
                />
            </Card>
        </div>
    );
};

export default SchedulePage;
