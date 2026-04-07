import { useToast } from '@/hooks/useToast';

export default function Home() {
    const toast = useToast();

    const fireAll = () => {
        toast.info('Action successfully submitted');
        toast.success('Action successfully submitted');
        toast.warning('Action has issues but was submitted');
        toast.error('Action has errors and was not submitted');
    };

    return (
        <div className="mx-auto max-w-mdContainer w-full flex flex-col gap-4">
            <p className="text-lg font-semibold">Toast test</p>
            <div className="flex gap-3">
                <button onClick={() => toast.info('Info - Action successfully submitted')}
                    className="px-4 py-2 bg-info text-white rounded">
                    Info
                </button>
                <button onClick={() => toast.success('Action successfully submitted')}
                    className="px-4 py-2 bg-success text-white rounded">
                    Success
                </button>
                <button onClick={() => toast.warning('Action has issues but was submitted')}
                    className="px-4 py-2 bg-warning text-white rounded">
                    Warning
                </button>
                <button onClick={() => toast.error('Action has errors and was not submitted')}
                    className="px-4 py-2 bg-danger text-white rounded">
                    Error
                </button>
                <button onClick={fireAll}
                    className="px-4 py-2 bg-primary text-primary rounded">
                    Fire All
                </button>
            </div>
        </div>
    );
}
