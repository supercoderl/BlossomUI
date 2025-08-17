import { Button, Card, Input, Select, theme, Typography } from "antd";
import {
    FilterOutlined
} from '@ant-design/icons';
import { Dispatch, SetStateAction } from "react";

const { Text } = Typography;
const { Option } = Select;

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
    filters: any,
    setFilters: (filters: any) => void,
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
                        placeholder="Blog title"
                        style={{ width: 180 }}
                        value={search}
                        onChange={(e) => handleValue(e.target.value)}
                    />

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