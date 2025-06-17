import { Button, Card, List, Typography } from "antd"
import {
    PlusOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useRouter } from "next/navigation";
import BasicLoading from "@/components/Loading/basic";
import { TechnicianInfo } from "@/types/user";
import { stringToColor } from "@/utils/color";

const { Title } = Typography;

const EmployeeManagement = ({ employees, loading }: {
    employees: TechnicianInfo[],
    loading: Record<string, boolean>
}) => {
    const router = useRouter();

    return (
        <Card
            style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                border: 'none'
            }}
        >
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                    <UserOutlined /> Employees ({employees.length})
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => router.push('/user/list')}
                    style={{ borderRadius: '6px', backgroundColor: '#8A784E' }}
                >
                    Add
                </Button>
            </div>
            {
                loading['get-technicians'] ?
                    <BasicLoading
                        className="w-1/2 h-1/2 mx-auto"
                    />
                    :
                    <List
                        size="small"
                        dataSource={employees}
                        renderItem={(employee: TechnicianInfo) => (
                            <List.Item
                                style={{
                                    padding: '10px',
                                    marginBottom: '6px',
                                    background: `${stringToColor(employee.id)}08`,
                                    borderRadius: '6px',
                                    border: `1px solid ${stringToColor(employee.id)}20`
                                }}
                            >
                                <List.Item.Meta
                                    title={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div
                                                style={{
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '50%',
                                                    backgroundColor: stringToColor(employee.id),
                                                    boxShadow: `0 0 0 2px ${stringToColor(employee.id)}20`
                                                }}
                                            />
                                            <span style={{ fontWeight: '500', fontSize: '13px' }}>
                                                {employee.fullName}
                                            </span>
                                        </div>
                                    }
                                    description={
                                        <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
                                            {employee.bio}
                                        </span>
                                    }
                                />
                            </List.Item>
                        )}
                    />
            }
        </Card>
    )
}

export default EmployeeManagement;