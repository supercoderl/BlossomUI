import { Button, Card, Input, theme, Typography } from "antd";
import {
    FilterOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const AdvancedSearchForm = ({
    filters,
    setFilters,
    applyFilters,
    clearFilters,
    onReload
}: {
    filters: any,
    setFilters: (filters: any) => void,
    applyFilters: () => void,
    clearFilters: () => void,
    onReload: () => void
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
                        value={""}
                        onChange={(e) => { }}
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