// import { notification, Table, Button, Layout, Menu, Typography } from "antd";
// import { useEffect, useState } from "react";
// import { getUserApi } from "../util/api";

// const { Sider, Content } = Layout;
// const { Title } = Typography;

// const UserPage = () => {
//     const [dataSource, setDataSource] = useState([]);
//     const [filterRole, setFilterRole] = useState('PATIENT');

//     useEffect(() => {
//         const fetchUser = async () => {
//             const res = await getUserApi();
//             if (!res?.message) {
//                 setDataSource(res);
//             } else {
//                 notification.error({
//                     message: "Unauthorized",
//                     description: res.message
//                 });
//             }
//         };
//         fetchUser();
//     }, []);

//     const columns = [
//         {
//             title: 'ID',
//             dataIndex: '_id',
//         },
//         {
//             title: 'Name',
//             dataIndex: 'name',
//         },
//         {
//             title: 'Email',
//             dataIndex: 'email',
//         },
//         {
//             title: 'Role',
//             dataIndex: 'role',
//         },
//     ];

//     const filteredData = dataSource.filter(item => item.role === filterRole);

//     return (
//         <Layout style={{ minHeight: '100vh' }}>
//             {/* SIDEBAR */}
//             <Sider width={220} style={{ background: '#fff' }}>
//                 <div style={{ padding: 20 }}>
//                     <Title level={4}>Quản lý User</Title>
//                 </div>

//                 <Menu
//                     mode="inline"
//                     selectedKeys={[filterRole]}
//                     onClick={(e) => setFilterRole(e.key)}
//                     items={[
//                         {
//                             key: 'PATIENT',
//                             label: 'Bệnh nhân',
//                         },
//                         {
//                             key: 'DOCTOR',
//                             label: 'Bác sĩ',
//                         }
//                     ]}
//                 />
//             </Sider>

//             {/* CONTENT */}
//             <Layout>
//                 <Content style={{ padding: '24px 32px' }}>
//                     <Title level={3}>
//                         {filterRole === 'PATIENT' ? 'Danh sách bệnh nhân' : 'Danh sách bác sĩ'}
//                     </Title>

//                     <Table
//                         bordered
//                         dataSource={filteredData}
//                         columns={columns}
//                         rowKey={"_id"}
//                         style={{
//                             marginTop: 20,
//                             background: '#fff',
//                             borderRadius: 8,
//                             padding: 10
//                         }}
//                         locale={{
//                             emptyText:
//                                 filterRole === 'PATIENT'
//                                     ? 'Chưa có bệnh nhân nào'
//                                     : 'Chưa có bác sĩ nào'
//                         }}
//                     />
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// };

// export default UserPage;



import {
    notification,
    Table,
    Layout,
    Menu,
    Typography,
    Button,
    Modal,
    Form,
    Input,
    Select
} from "antd";
import { useEffect, useState } from "react";
import { getUserApi, createUserByAdminApi } from "../util/api";

const { Sider, Content } = Layout;
const { Title } = Typography;

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [filterRole, setFilterRole] = useState('PATIENT');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [form] = Form.useForm();

    const fetchUser = async () => {
        const res = await getUserApi();
        if (!res?.message) {
            setDataSource(res);
        } else {
            notification.error({
                message: "Unauthorized",
                description: res.message
            });
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        setPageSize(10);
    }, [filterRole]);

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
            render: (role) => (
                <span style={{
                    color: role === 'DOCTOR' ? 'green' : 'blue',
                    fontWeight: 'bold'
                }}>
                    {role}
                </span>
            )
        },
    ];

    const filteredData = dataSource.filter(item => item.role === filterRole);

    // 👉 submit form
    const onFinish = async (values) => {
        const { name, email, password, role } = values;

        const res = await createUserByAdminApi(name, email, password, role);

        if (res && res.EC === 1) {
            notification.error({
                message: 'Create failed',
                description: res.EM
            });
        } else if (res) {
            notification.success({
                message: 'Create successfully',
            });

            setIsModalOpen(false);
            form.resetFields();
            fetchUser(); // reload data
        } else {
            notification.error({
                message: 'Create failed',
            });
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* SIDEBAR */}
            <Sider width={220} style={{ background: '#fff' }}>
                <div style={{ padding: 20 }}>
                    <Title level={4}>Quản lý User</Title>
                </div>

                <Menu
                    mode="inline"
                    selectedKeys={[filterRole]}
                    onClick={(e) => setFilterRole(e.key)}
                    items={[
                        { key: 'PATIENT', label: 'Bệnh nhân' },
                        { key: 'DOCTOR', label: 'Bác sĩ' }
                    ]}
                />
            </Sider>

            {/* CONTENT */}
            <Layout>
                <Content style={{ padding: '24px 32px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Title level={3}>
                            {filterRole === 'PATIENT'
                                ? 'Danh sách bệnh nhân'
                                : 'Danh sách bác sĩ'}
                        </Title>

                        {/* 👉 Nút thêm */}
                        <Button
                            type="primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Thêm người dùng
                        </Button>
                    </div>

                    <Table
                        bordered
                        dataSource={filteredData}
                        columns={columns}
                        rowKey={"_id"}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            total: filteredData.length,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '20', '50']
                        }}
                        onChange={(pagination) => {
                            setCurrentPage(pagination.current);
                            setPageSize(pagination.pageSize);
                        }}
                        style={{
                            marginTop: 20,
                            background: '#fff',
                            borderRadius: 8,
                            padding: 10
                        }}
                        locale={{
                            emptyText:
                                filterRole === 'PATIENT'
                                    ? 'Chưa có bệnh nhân nào'
                                    : 'Chưa có bác sĩ nào'
                        }}
                    />

                    {/* 👉 MODAL CREATE USER */}
                    <Modal
                        title="Tạo người dùng mới"
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        onOk={() => form.submit()}
                        okText="Tạo"
                        cancelText="Hủy"
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Nhập tên!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Nhập email!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Nhập password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[{ required: true, message: 'Chọn role!' }]}
                            >
                                <Select
                                    options={[
                                        { value: 'DOCTOR', label: 'Bác sĩ' },
                                        { value: 'PATIENT', label: 'Bệnh nhân' }
                                    ]}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserPage;
