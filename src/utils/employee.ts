import { TechnicianInfo } from "@/types/user";


export const getEmployeeName = (employeeId: string, employees: TechnicianInfo[]) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.fullName : 'Unknown';
};

export const getShiftColor = (shift: string) => {
    const colors = {
        'Morning': '#52c41a',
        'Afternoon': '#1890ff',
        'Evening': '#faad14',
        'Night': '#722ed1'
    };
    return colors[shift as keyof typeof colors] || '#666';
};

export const getEmployeeById = (id: string, employees: TechnicianInfo[]) => {
    return employees.find(emp => emp.id === id);
};