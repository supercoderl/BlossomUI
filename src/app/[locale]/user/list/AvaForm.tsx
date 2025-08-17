import { Button, Card, Dropdown, Input, Space, theme, Typography } from "antd";
import {
    DownOutlined,
    FilterOutlined
} from '@ant-design/icons';
import { Dispatch, SetStateAction } from "react";
import { UserRoles } from "@/enums/userRoles";
import { Filter } from "@/types/filter";

const { Text } = Typography;

const AdvancedSearchForm = ({
    filters,
    setFilters,
    applyFilters,
    clearFilters,
    onReload,
    onOpen,
    search,
    handleValue
}: {
    filters: Filter,
    setFilters: Dispatch<SetStateAction<Filter>>,
    applyFilters: () => void,
    clearFilters: () => void,
    onReload: () => void,
    onOpen: () => void,
    search: string,
    handleValue: Dispatch<SetStateAction<string>>
}) => {
    const { token } = theme.useToken();

    return (
        <Card style={{ marginBottom: '24px' }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center wrap" style={{ gap: 16 }}>
                    <FilterOutlined />
                    <Text strong>Filters:</Text>

                    <Input
                        placeholder="Input key..."
                        style={{ width: 180 }}
                        value={search}
                        onChange={(e) => handleValue(e.target.value)}
                    />

                    <Dropdown
                        menu={{
                            items: Object.keys(Object.keys(UserRoles).filter(
                                key => (isNaN(Number(key))) && UserRoles[key as keyof typeof UserRoles] !== UserRoles.Bot)
                            ).map(key => ({
                                key,
                                label: UserRoles[key as keyof typeof UserRoles]
                            })),
                            selectable: true,
                            onSelect: ({ key }) => setFilters((prev: Filter) => ({ ...prev, role: Number(key) })),
                        }}
                        placement="bottom"
                        arrow={{ pointAtCenter: true }}
                        trigger={['click']}
                    >
                        <Button>
                            <Space>
                                Select role
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>

                    <Button type="primary" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                    <Button onClick={clearFilters}>
                        Clear
                    </Button>
                </div>

                <div className="flex items-center wrap" style={{ gap: 16 }}>
                    <Button
                        type="primary"
                        style={{ backgroundColor: token.colorSuccess }}
                        onClick={onOpen}
                    >
                        New
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={onReload}
                    >
                        Reload
                    </Button>
                </div>
            </div>
        </Card >
    )
}

export default AdvancedSearchForm;