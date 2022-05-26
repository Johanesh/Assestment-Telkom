import { useState, useEffect } from 'react';
import {
    Button,
    Input,
    Tooltip,
    Row,
    Col,
} from 'antd';
import { CopyOutlined, ForkOutlined, GlobalOutlined, LockOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';

const List = () => {
    const [getData, setGetData] = useState(true);
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    useEffect(async () => {
        const name = localStorage.getItem('name');
        const repoURL = localStorage.getItem('repo');
        if (getData) {
            // await axios.get(`${repoURL}`).then((res) => {
            //     console.log(res);
            // }). catch((err) => {
            //     setError(err.message);
            // });
            setGetData(false);
            setUsername(name);
        }
    }, []);

    return (
        <div className='list'>
            <div className='list__wrapper'>
                <div className='list__error'>{error}</div>
                <h1>{username} Repo List</h1>
                <div className='list__container'>
                    <div className='list__content'>
                        <h3>Repo Name <GlobalOutlined /></h3>
                        <p>description</p>
                        <div className='list__action'>
                            <div className='list__action-content'>
                                <Tooltip title="fork">
                                    <ForkOutlined />
                                    <div className='list__action-count'>
                                        50000
                                    </div>
                                </Tooltip>
                            </div>
                            <div className='list__action-content'>
                                <Tooltip title="star">
                                    <StarOutlined />
                                    <div className='list__action-count'>
                                        50000
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <Row className='list__input-group' gutter={8}>
                            <Col span={12}>
                                <Input.Group compact>
                                    <Input
                                        className='list__input'
                                        defaultValue="git@github.com:ant-design/ant-design.git"
                                    />
                                    <Tooltip title="copy">
                                        <Button type="primary" icon={<CopyOutlined />} />
                                    </Tooltip>
                                </Input.Group>
                            </Col>
                            <Col span={12}>
                                <Input.Group compact>
                                    <Input
                                        className='list__input'
                                        defaultValue="git@github.com:ant-design/ant-design.git"
                                    />
                                    <Tooltip title="copy">
                                        <Button type="primary" icon={<CopyOutlined />} />
                                    </Tooltip>
                                </Input.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className='list__content'>
                        <h3>Repo Name <LockOutlined /></h3>
                        <p>description</p>
                        <div className='list__action'>
                            <div className='list__action-content'>
                                <Tooltip title="fork">
                                    <ForkOutlined />
                                    <div className='list__action-count'>
                                        50000
                                    </div>
                                </Tooltip>
                            </div>
                            <div className='list__action-content'>
                                <Tooltip title="star">
                                    <StarOutlined />
                                    <div className='list__action-count'>
                                        50000
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <Row className='list__input-group' gutter={8}>
                            <Col span={12}>
                                <Input.Group compact>
                                    <Input
                                        className='list__input'
                                        defaultValue="git@github.com:ant-design/ant-design.git"
                                    />
                                    <Tooltip title="copy">
                                        <Button type="primary" icon={<CopyOutlined />} />
                                    </Tooltip>
                                </Input.Group>
                            </Col>
                            <Col span={12}>
                                <Input.Group compact>
                                    <Input
                                        className='list__input'
                                        defaultValue="git@github.com:ant-design/ant-design.git"
                                    />
                                    <Tooltip title="copy">
                                        <Button type="primary" icon={<CopyOutlined />} />
                                    </Tooltip>
                                </Input.Group>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default List;