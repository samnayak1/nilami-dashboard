import { Form, Input, InputNumber, DatePicker, Button, Upload, Select, type UploadFile } from 'antd';
import { useCreateItemWorkflow } from '../hooks/CreateItemHook';
import { useMemo, useState } from 'react';
import { useCategories } from '../hooks/CategoryListHook';

import type { RcFile, UploadProps } from 'antd/es/upload';
import type { CreateItemPayload } from '../types';

export const CreateItemForm = ({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) => {
    const { mutate, isPending } = useCreateItemWorkflow();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { data: categoryData, isLoading: categoryLoading } = useCategories(0, 50);
    const categoryOptions = useMemo(() => {
        return categoryData?.content.map(cat => ({
            label: cat.name,
            value: cat.id,
        })) || [];
    }, [categoryData]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
     setFileList(newFileList);
    };

    const onFinish = (values: CreateItemPayload) => {
        const filesToUpload = fileList
                 .map(f => f.originFileObj)
                 .filter((f): f is RcFile => !!f);

        const payload = {
            ...values
        };

        mutate({ itemData: payload, files: filesToUpload }, {
            onSuccess: () => {
                onSuccess();
            },
            onError: (error) => {
                console.error("Error creating item:", error);
                onCancel();
            }
        });
    };

    return (
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="title" label="Item Name"><Input /></Form.Item>
            <Form.Item name="brand" label="Brand"><Input /></Form.Item>
            <Form.Item name="description" label="Description">
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} /></Form.Item>
            <Form.Item name="basePrice" label="Starting Price">$ <InputNumber min={0} /></Form.Item>
            <Form.Item name="expiryTime" label="End Date"><DatePicker showTime /></Form.Item>

            <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true }]}
            >
                <Select
                    placeholder="Select a category"
                    loading={categoryLoading}
                    showSearch
                    options={categoryOptions}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                />
            </Form.Item>

            <Form.Item label="Pictures" valuePropName="fileList">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false} 
                    maxCount={3}
                >
                    {fileList.length >= 3 ? null : (
                        <button style={{ border: 0, background: 'none' }} type="button">
                            
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    )}
                </Upload>
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isPending}>
                {isPending ? 'Uploading & Creating...' : 'Submit Auction'}
            </Button>
        </Form>
    );
};