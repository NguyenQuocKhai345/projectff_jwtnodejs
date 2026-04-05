import React, { useEffect, useState } from 'react';
import { Form, Button, Select, DatePicker, notification, Card } from 'antd';
import dayjs from 'dayjs';
import { getDoctorsApi, createAppointmentApi } from '../util/api';

const { Option } = Select;

const AppointmentPage = () => {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const res = await getDoctorsApi();

        if (res && !res.message) {
            setDoctors(res);
        } else if (res?.message) {
            notification.error({
                message: 'Lỗi tải danh sách bác sĩ',
                description: res.message
            });
        }
    };

    const onFinish = async (values) => {
        console.log("VALUES:", values);

        const { doctorId, start, end } = values;

        if (!doctorId || !start || !end) {
            notification.error({
                message: "Vui lòng điền đầy đủ thông tin"
            });
            return;
        }

        // Gửi ISO string UTC (với Z)
        // dayjs().toDate() = local time
        // toDate().toISOString() = UTC string (tự động convert từ local +07:00 sang UTC)
        const startTime = start.toDate().toISOString();
        const endTime = end.toDate().toISOString();

        console.log(">>> startTime FE (ISO UTC): ", startTime);
        console.log(">>> endTime FE (ISO UTC): ", endTime);

        const res = await createAppointmentApi(
            doctorId,
            startTime,
            endTime
        );

        console.log(">>> check res: ", res);

        if (res && res.EC === 0) {
            notification.success({
                message: "Đặt lịch thành công"
            });
        } else {
            notification.error({
                message: "Lỗi",
                description: res?.EM || "Error"
            });
        }
    };


    return (
        <div style={{
            maxWidth: 600,
            margin: '50px auto'
        }}>
            <Card title="Đặt lịch khám" style={{ borderRadius: 10 }}>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >


                    <Form.Item
                        label="Chọn bác sĩ"
                        name="doctorId"
                        rules={[{ required: true, message: 'Vui lòng chọn bác sĩ' }]}
                    >
                        <Select placeholder="Chọn bác sĩ">
                            {doctors.map(doc => (
                                <Option key={doc._id} value={doc._id}>
                                    {doc.name} - {doc.email}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Chọn thời gian bắt đầu"
                        name="start"
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu' }]}
                    >
                        <DatePicker
                            showTime
                            style={{ width: '100%' }}
                            disabledDate={(current) =>
                                current && current < dayjs().startOf('day')
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Chọn thời gian kết thúc"
                        name="end"
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc' }]}
                    >
                        <DatePicker
                            showTime
                            style={{ width: '100%' }}
                            disabledDate={(current) =>
                                current && current < dayjs().startOf('day')
                            }
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đặt lịch
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    );
};

export default AppointmentPage;
