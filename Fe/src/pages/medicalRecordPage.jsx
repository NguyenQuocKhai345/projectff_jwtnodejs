
import React, { useEffect, useState } from 'react';
import { Typography, Divider } from 'antd';
import { useParams } from 'react-router-dom';
import { getMedicalRecordApi } from '../util/api';
import dayjs from 'dayjs';
import logo from '../assets/images/logo.png';

const { Title, Text } = Typography;

const MedicalRecordPage = () => {
    const { id } = useParams();
    const [record, setRecord] = useState(null);

    useEffect(() => {
        fetchRecord();
    }, []);

    const fetchRecord = async () => {
        const res = await getMedicalRecordApi(id);
        if (res && res.EC === 0) {
            setRecord(res.record);
        }
    };

    if (!record) return <div>Loading...</div>;

    return (
        <div style={{
            maxWidth: 900,
            margin: '40px auto',
            background: '#fff',
            padding: 40,
            borderRadius: 8,
            boxShadow: '0 0 12px rgba(0,0,0,0.08)',
            fontFamily: 'Times New Roman'
        }}>

            {/* ===== HEADER ===== */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="logo" style={{ width: 70, marginRight: 15 }} />
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                            BỆNH VIỆN CAREPLUS
                        </div>
                        <div style={{ fontSize: 14, fontStyle: 'italic' }}>
                            Sức khỏe của bạn, Ưu tiên của chúng tôi
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: 14, marginTop: '20px' }}>
                    TP. Hồ Chí Minh, ngày {dayjs().format('DD/MM/YYYY')}
                </div>
            </div>

            <Divider />

            {/* ===== TITLE ===== */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <Title level={3} style={{ margin: 0 }}>
                    HỒ SƠ KHÁM BỆNH
                </Title>
            </div>

            {/* ===== INFO ===== */}
            <div style={{ marginBottom: 20 }}>
                <p><b>Bệnh nhân:</b> {record.patientId?.name}</p>
                <p><b>Bác sĩ phụ trách:</b> {record.doctorId?.name}</p>
                <p><b>Ngày tạo hồ sơ:</b> {dayjs(record.createdAt).format('DD/MM/YYYY HH:mm')}</p>
            </div>

            <Divider />

            {/* ===== DIAGNOSIS ===== */}
            <div style={{ marginBottom: 20 }}>
                <Title level={5}>I. Chẩn đoán</Title>
                <div style={{
                    border: '1px solid #000',
                    padding: 15,
                    minHeight: 80
                }}>
                    {record.diagnosis}
                </div>
            </div>

            {/* ===== PRESCRIPTION ===== */}
            <div style={{ marginBottom: 20 }}>
                <Title level={5}>II. Đơn thuốc</Title>
                <div style={{
                    border: '1px solid #000',
                    padding: 15,
                    minHeight: 80
                }}>
                    {record.prescription}
                </div>
            </div>

            <Divider />

            {/* ===== SIGNATURE ===== */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 40
            }}>
                <div style={{ textAlign: 'center' }}>
                    <p><b>Bệnh nhân</b></p>
                    <p>(Ký, ghi rõ họ tên)</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <p><b>Bác sĩ</b></p>
                    <p>(Ký, ghi rõ họ tên)</p>
                    <div style={{ marginTop: 40, fontWeight: 'bold' }}>
                        {record.doctorId?.name}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MedicalRecordPage;
