import React from 'react';

interface User {
    name: string;
    last_name: string;
}

interface State {
    name: string;
}

interface TaskOperator {
    ID_user: number;
    user: User;
    state: State;
    assignment_date: string;
}

interface Task {
    ID_task: number;
    title: string;
    taskOperators: TaskOperator[];
}

interface TaskCardProps {
    task: Task;
    index: number;
}

const getStatusClasses = (statusName: string) => {
    switch (statusName) {
        case 'Terminado':
            return 'bg-gray-400 text-white';
        case 'En proceso':
            return 'bg-red-600 text-white';
        case 'En espera':
            return 'bg-gray-500 text-white';
        default:
            return 'bg-gray-200 text-gray-800';
    }
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
    return (
        <div className="p-4 rounded-lg mb-4 bg-white border border-gray-200 shadow-sm">
            {/* Task Title */}
            <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mr-4"
                    style={{ backgroundColor: '#ADC708' }}>
                    {index + 1}
                </div>
                <div className="w-full md:w-2/5">
                    <h3 className="text-lg text-gray-800 font-bold">{task.title}</h3>
                </div>
            </div>

            {/* Task Operators */}
            {task.taskOperators && task.taskOperators.length > 0 ? (
                task.taskOperators.map((operator: TaskOperator, opIndex: number) => (
                    <div key={opIndex} className="flex flex-col md:flex-row md:items-center md:justify-between pl-12 md:pl-0 py-2 border-t border-gray-100">
                        
                        {/* Spacer to align with title on large screens */}
                        <div className="hidden md:block md:w-2/5"></div>

                        {/* Operator Name */}
                        <div className="flex items-center md:w-1/5 mb-2 md:mb-0">
                            <span className="text-xl mr-2" style={{ color: '#199431' }}>
                                👤
                            </span>
                            <span className="text-gray-700">{operator.user.name} {operator.user.last_name}</span>
                        </div>

                        {/* State */}
                        <div className="flex items-center md:w-1/5 md:justify-center mb-2 md:mb-0">
                            <span className="md:hidden font-bold mr-2">Estado:</span>
                            <div className={`px-4 py-1 text-sm font-semibold rounded ${getStatusClasses(operator.state.name)}`}>
                                {operator.state.name}
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center md:w-1/5 md:justify-end">
                            <span className="md:hidden font-bold mr-2">Fecha:</span>
                            <div className="text-sm text-gray-600">
                                {new Date(operator.assignment_date).toLocaleDateString('es-ES')}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="pl-12 text-gray-500">Sin operarios asignados</div>
            )}
        </div>
    );
};