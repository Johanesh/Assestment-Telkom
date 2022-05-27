import { useEffect, Fragment } from 'react';
import {
    Alert,
    Button,
    Input,
    Tooltip,
    Row,
    Col,
} from 'antd';
import { CopyOutlined, ForkOutlined, GlobalOutlined, LockOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import cookies from 'react-cookies';
import cookieParser from 'cookie';
import {
    getData,
    setData,
    clearData,
} from '../store/features/repolist/index.js';

const List = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const repoListData = useSelector(getData);

    useEffect(() => {
        dispatch(setData(props.dataList));
    }, [props.dataList]);

    const copyToClipBoard = (str) => {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert("Copied the text: " + str);
    };

    const handleQuit = () => {
        cookies.remove('name');
        cookies.remove('repo');
        dispatch(clearData());
        router.push('/');
    };

    return (
        <div className='list'>
            <div className='list__wrapper'>
                {
                    props.error && (
                        <Alert message={props.error} type="error" showIcon />
                    )
                }
                <h1>{props.name} Repo List</h1>
                <div className='list__container'>
                    {
                        repoListData.payload.repolist.list.length > 0 ? (
                            <Fragment>
                                {
                                    repoListData.payload.repolist.list.map((item) => {
                                        return (
                                            <div className='list__content'>
                                                <div className='list__url' onClick={() => window.location.href = item.html_url}>
                                                    <h3>{item.name} {item.visibility == "public" ? <GlobalOutlined /> : <LockOutlined />}</h3>
                                                    <p>{item.description || ''}</p>
                                                </div>
                                                <div className='list__action'>
                                                    <div className='list__action-content'>
                                                        <Tooltip title="fork">
                                                            <ForkOutlined />
                                                            <div className='list__action-count'>
                                                                {item.forks_count}
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                    <div className='list__action-content'>
                                                        <Tooltip title="star">
                                                            <StarOutlined />
                                                            <div className='list__action-count'>
                                                                {item.stargazers_count}
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                <Row className='list__input-group' gutter={8}>
                                                    <Col span={12}>
                                                        <Input.Group compact>
                                                            <Input
                                                                className='list__input'
                                                                defaultValue={'SSH: ' + item.ssh_url}
                                                            />
                                                            <Tooltip title="copy">
                                                                <Button type="primary" icon={<CopyOutlined />} onClick={() => copyToClipBoard(item.ssh_url)} />
                                                            </Tooltip>
                                                        </Input.Group>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Input.Group compact>
                                                            <Input
                                                                className='list__input'
                                                                defaultValue={'Git URL: ' + item.git_url}
                                                            />
                                                            <Tooltip title="copy">
                                                                <Button type="primary" icon={<CopyOutlined />} onClick={() => copyToClipBoard(item.git_url)} />
                                                            </Tooltip>
                                                        </Input.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                            </Fragment>
                        ) : (
                            <div className='list__content list__content--empty'>
                                Repo's data list is empty
                            </div>
                        )
                    }
                </div>
                <div className='list__quit'>
                    <Button danger onClick={() => handleQuit()}>
                        Check other repo
                    </Button>
                </div>
            </div>
        </div>
    )
};

export async function getServerSideProps(ctx) {
    let dataList = [];
    let name = "";
    let error = "";
    
    if (ctx.req.headers.cookie) {
        const dataCookie = cookieParser.parse(ctx.req.headers.cookie);
        name = dataCookie.name;

        await axios.get(`${dataCookie.repo}`).then((res) => {
            const resData = res.data;
            dataList = resData;
        }). catch((err) => {
            error = err.message;
        });
    } else {
        return {
            redirect: {
              permanent: false,
              destination: "/"
            }
        }
    }

    return { props: { name, dataList, error } }
}

export default List;