import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../util/api";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            // Implementation for fetching user data
            const res = await getUserApi();
            if (!res?.message) {
                setDataSource(res);
            }
            else {
                notification.error({
                    message: "Unothorized",
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
    ];


    return (
        <div style={{ padding: 50 }}>
            <Table
                bordered
                dataSource={dataSource} columns={columns}
                rowKey={"_id"} />

        </div>
    );
}

export default UserPage;