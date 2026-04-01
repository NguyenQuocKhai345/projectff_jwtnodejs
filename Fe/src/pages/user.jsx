import { notification, Table, Button, Space } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [filterRole, setFilterRole] = useState('PATIENT');

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserApi();
            if (!res?.message) {
                setDataSource(res);
            }
            else {
                notification.error({
                    message: "Unauthorized",
                    description: res.message
                })
            }
        }
        fetchUser();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
    ];

    const roleOptions = [
        { key: 'PATIENT', label: 'Bệnh nhân' },
        { key: 'DOCTOR', label: 'Bác sĩ' },
    ];

    const filteredData = dataSource.filter(item => item.role === filterRole);

    return (
        <div style={{ padding: 50 }}>
            <Space style={{ marginBottom: 24 }}>
                {roleOptions.map((role) => (
                    <Button
                        key={role.key}
                        type={filterRole === role.key ? 'primary' : 'default'}
                        onClick={() => setFilterRole(role.key)}
                    >
                        {role.label}
                    </Button>
                ))}
            </Space>
            <Table
                bordered
                dataSource={filteredData}
                columns={columns}
                rowKey={"_id"}
                locale={{ emptyText: `Chưa có ${filterRole === 'PATIENT' ? 'bệnh nhân' : 'bác sĩ'} nào` }}
            />
        </div>
    );
}

export default UserPage;