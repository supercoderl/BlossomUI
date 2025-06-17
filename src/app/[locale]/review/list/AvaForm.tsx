import { Button, Card, Input, Select, Typography } from "antd";
import {
    FilterOutlined
} from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

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
    return (
        < Card style={{ marginBottom: '24px' }
        }>
            <div className="flex items-center justify-between">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <FilterOutlined />
                    <Text strong>Filters:</Text>

                    <Select
                        placeholder="Rating"
                        style={{ width: 120 }}
                        value={filters.rating}
                        onChange={(value) => setFilters({ ...filters, rating: value })}
                        allowClear
                    >
                        {[1, 2, 3, 4, 5].map(rating => (
                            <Option key={rating} value={rating}>
                                {rating} Star{rating > 1 ? 's' : ''}
                            </Option>
                        ))}
                    </Select>

                    <Input
                        placeholder="Product name"
                        style={{ width: 180 }}
                        value={filters.product ?? ""}
                        onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                    />

                    <Button type="primary" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                    <Button onClick={clearFilters}>
                        Clear
                    </Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Button type="primary" danger onClick={onReload}>
                        Reload
                    </Button>
                </div>
            </div>
        </Card >
    )
}

export default AdvancedSearchForm;