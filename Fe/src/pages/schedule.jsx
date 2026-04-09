import React, { useEffect, useState, useContext } from 'react';
import { Table, Tag, Button, Select, Space, notification, Card, Modal, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { cancelScheduleApi, createMedicalRecordApi, getScheduleApi, updateScheduleApi } from '../util/api';
import AuthContext from '../components/context/auth.context';
import { DatePicker } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';



const { Option } = Select;

const SchedulePage = () => {
    const [data, setData] = useState([]);
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [isModalRecordOpen, setIsModalRecordOpen] = useState(false);
    const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [filterDoctor, setFilterDoctor] = useState(null);
    const [filterPatient, setFilterPatient] = useState(null);
    const [filterDate, setFilterDate] = useState(null);

    const navigate = useNavigate();




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

    const handleCancel = async (values) => {
        const { note } = values;

        const res = await cancelScheduleApi(selectedId, note);

        if (res && res.EC === 0) {
            notification.success({
                message: "Hủy lịch thành công"
            });
            setIsModalOpen(false);
            fetchSchedule();
        } else {
            notification.error({
                message: res?.EM || "Lỗi hủy lịch",
                description: res?.EM
            });
        }
    };

    const [formRecord] = Form.useForm();

    const handleCreateMedicalRecord = async (values) => {
        const { diagnosis, prescription } = values;

        const res = await createMedicalRecordApi(
            selectedId,
            diagnosis,
            prescription
        );

        if (res && res.EC === 0) {
            notification.success({
                message: "Tạo hồ sơ y tế thành công"
            });

            setIsModalRecordOpen(false);
            formRecord.resetFields();
            fetchSchedule();
        } else {
            notification.error({
                message: res?.EM || "Lỗi tạo hồ sơ y tế",
                description: res?.EM
            });
        }
    };


    const handleUpdate = async (values) => {
        const { note } = values;

        const res = await updateScheduleApi(selectedId, note);

        if (res && res.EC === 0) {
            notification.success({
                message: "Thành công",
                description: res?.EM
            });
            setIsModalConfirmOpen(false);
            setIsModalCompleteOpen(false);
            fetchSchedule();
        } else {
            notification.error({
                message: "Lỗi cập nhật lịch",
                description: res?.EM
            });
        }
    };

    const handleGetRecord = (id) => {
        navigate(`/getMedicalRecord/${id}`);
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
        const role = auth?.user?.role;

        if (record.status === 'pending') {

            if (role === 'PATIENT') {
                return (
                    <Button
                        danger
                        onClick={() => {
                            setSelectedId(record._id);
                            setIsModalOpen(true);
                        }}
                    >
                        Hủy
                    </Button>
                );
            }

            if (role === 'DOCTOR') {
                return (
                    <Space>
                        <Button type="primary"

                            onClick={() => {
                                setSelectedId(record._id);
                                setIsModalConfirmOpen(true);
                            }}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            danger
                            onClick={() => {
                                setSelectedId(record._id);
                                setIsModalOpen(true);
                            }}
                        >
                            Hủy
                        </Button>
                    </Space>
                );
            }
        }
        //debugger;
        if (role === 'DOCTOR' && record.status === 'confirmed') {
            return (
                <Button type="primary"

                    onClick={() => {
                        setSelectedId(record._id);
                        setIsModalCompleteOpen(true);
                    }}
                >
                    Hoàn thành
                </Button>
            );
        }
        if (role === 'DOCTOR' && record.status === 'completed' && !record.medicalRecordId) {
            return (
                <Button type="primary"

                    onClick={() => {
                        setSelectedId(record._id);
                        setIsModalRecordOpen(true);
                    }}
                >
                    Tạo hồ sơ y tế
                </Button>
            );
        }
        if (record.status === 'completed' && record.medicalRecordId) {
            return (
                <Button type="primary"

                    onClick={() => {
                        handleGetRecord(record._id);
                    }}
                >
                    Xem hồ sơ y tế
                </Button>
            );
        }
        if (role !== 'DOCTOR' && record.status === 'completed' && !record.medicalRecordId) {
            return (
                <div>
                    Chưa có hồ sơ y tế
                </div>

            );
        }

        return null;
    };


    const filteredData = data.filter(item => {

        if (filterStatus !== "ALL" && item.status !== filterStatus) return false;

        if (filterDate) {
            const itemDate = dayjs(item.startTime).format("YYYY-MM-DD");
            const selectedDate = dayjs(filterDate).format("YYYY-MM-DD");
            if (itemDate !== selectedDate) return false;
        }

        if (filterDoctor && item.doctorId?._id !== filterDoctor) return false;

        if (filterPatient && item.patientId?._id !== filterPatient) return false;

        return true;
    });

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

                <Space style={{ marginBottom: 20 }} wrap>

                    {/* STATUS */}
                    <Select
                        value={filterStatus}
                        onChange={setFilterStatus}
                        style={{ width: 150 }}
                    >
                        <Option value="ALL">Tất cả</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="confirmed">Confirmed</Option>
                        <Option value="cancelled">Cancelled</Option>
                        <Option value="completed">Completed</Option>
                    </Select>

                    <DatePicker
                        value={filterDate}
                        placeholder="Chọn ngày"
                        onChange={(date) => setFilterDate(date)}
                    />

                    {auth?.user?.role === 'ADMIN' && (
                        <>
                            <Select
                                value={filterDoctor}
                                placeholder="Chọn bác sĩ"
                                allowClear
                                style={{ width: 180 }}
                                onChange={setFilterDoctor}
                            >
                                {data.map(item => item.doctorId).filter((v, i, a) =>
                                    a.findIndex(t => t._id === v._id) === i
                                ).map(doc => (
                                    <Option key={doc._id} value={doc._id}>
                                        {doc.name}
                                    </Option>
                                ))}
                            </Select>

                            <Select
                                value={filterPatient}
                                placeholder="Chọn bệnh nhân"
                                allowClear
                                style={{ width: 180 }}
                                onChange={setFilterPatient}
                            >
                                {data.map(item => item.patientId).filter((v, i, a) =>
                                    a.findIndex(t => t._id === v._id) === i
                                ).map(p => (
                                    <Option key={p._id} value={p._id}>
                                        {p.name}
                                    </Option>
                                ))}
                            </Select>
                        </>
                    )}
                    <Button onClick={() => {
                        setFilterStatus("ALL");
                        setFilterDate(null);
                        setFilterDoctor(null);
                        setFilterPatient(null);
                    }}>
                        Reset
                    </Button>


                </Space>

                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="_id"
                    bordered
                />
                <Modal
                    title="Xác nhận hủy lịch"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                >
                    <Form onFinish={handleCancel}>
                        <Form.Item
                            label="Lý do hủy"
                            name="note"
                            rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}
                        >
                            <Input.TextArea rows={3} placeholder="Nhập lý do..." />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button onClick={() => setIsModalOpen(false)}>
                                    Hủy bỏ
                                </Button>
                                <Button type="primary" danger htmlType="submit">
                                    Xác nhận hủy
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Xác nhận nhận lịch"
                    open={isModalConfirmOpen}
                    onCancel={() => setIsModalConfirmOpen(false)}
                    footer={null}
                >
                    <Form onFinish={handleUpdate}>
                        <Form.Item>
                            <Space>
                                <Button onClick={() => setIsModalConfirmOpen(false)}>
                                    Hủy bỏ
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Xác nhận nhận lịch
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Xác nhận hoàn thành buổi khám"
                    open={isModalCompleteOpen}
                    onCancel={() => setIsModalCompleteOpen(false)}
                    footer={null}
                >
                    <Form onFinish={handleUpdate}>
                        <Form.Item
                            label="Nhận xét sau khi khám"
                            name="note"
                            rules={[{ required: true, message: 'Vui lòng nhập nhận xét' }]}
                        >
                            <Input.TextArea rows={3} placeholder="Nhập nhận xét..." />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button onClick={() => setIsModalCompleteOpen(false)}>
                                    Hủy bỏ
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Xác nhận hoàn thành buổi khám
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Tạo hồ sơ y tế"
                    open={isModalRecordOpen}
                    onCancel={() => setIsModalRecordOpen(false)}
                    footer={null}
                >
                    <Form form={formRecord} onFinish={handleCreateMedicalRecord}>
                        <Form.Item
                            label="Chẩn đoán"
                            name="diagnosis"
                            rules={[{ required: true, message: 'Vui lòng nhập chẩn đoán' }]}
                        >
                            <Input.TextArea rows={3} placeholder="Nhập chẩn đoán..." />
                        </Form.Item>

                        <Form.Item
                            label="Đơn thuốc"
                            name="prescription"
                            rules={[{ required: true, message: 'Vui lòng nhập đơn thuốc' }]}
                        >
                            <Input.TextArea rows={3} placeholder="Nhập đơn thuốc..." />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button onClick={() => setIsModalRecordOpen(false)}>
                                    Hủy bỏ
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Tạo hồ sơ y tế
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>

            </Card>
        </div>
    );
};

export default SchedulePage;
