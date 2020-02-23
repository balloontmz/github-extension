/*global chrome*/
import { List, Avatar, Skeleton, Icon } from 'antd';

import React from 'react'
import axios from 'axios'

import { Series } from './componests/lineChart'
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { ProjectDetail } from './ProjectDetail';
// import * as ReactMarkdown from 'react-markdown';
//[解决 markdown ts import 问题](https://github.com/rexxars/react-markdown/issues/207)
import ReactMarkdown from 'react-markdown'

const count = 3

let isExtension = process.env.REACT_APP_IS_EXTENSION

interface SectionProps {
    page: number
}

export class SectionDetail extends React.Component<SectionProps, {}> {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        mdInfo: '',
    };

    componentDidMount() {
        this.getData((res: any) => {
            console.log('当前的 res 为:', res)
            const data = this.state.data.concat(res);
            console.log('合并之后的 data 为:', data)
            this.setState({
                initLoading: false,
                data: data,
                list: data,
            });
        });
    }

    getData = (callback: Function) => {
        // json({
        //     url: fakeDataUrl,
        //     type: 'json',
        //     method: 'get',
        //     contentType: 'application/json',
        //     success: (res: any) => {
        //         callback(res);
        //     },
        // });
        // json.get(fakeDataUrl).then((data) => {
        //     console.log('返回结果为:')
        //     console.log(data)
        //     callback(data)
        // });
        console.log(chrome)
        console.log('开始设置')
        // chrome.storage.sync.set({ result: [1, 2, 3] }, function () {
        //     console.log('设置结果成功')
        // })
        // chrome.storage.sync.get("result", function (data) {
        //     console.log('获取结果成功,结果为:')
        //     console.log(data)
        // })
        if (isExtension === "true") {
            chrome.storage.sync.get("githubExtensionLinkArr", (data) => {
                console.log('获取结果成功,结果为:(应该是没结果)')
                console.log(data.githubExtensionLinkArr)
                for (let i = 0; i < data.githubExtensionLinkArr.length; i++) {
                    const element = data.githubExtensionLinkArr[i];

                    this.loadGithubInfoUseLink(element).then((res) => {
                        callback(res)
                    }).catch((e) => {
                        console.log('请求出错,错误原因为:', e)
                    })
                }
            })
        } else {
            let arr = ["https://github.com/chenfengyanyu/source", "https://github.com/chenfengyanyu/my-web-accumulation/tree/master/chrome-extension"]
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];

                this.loadGithubInfoUseLink(element).then((res) => {
                    callback(res)
                }).catch((e) => {
                    console.log('请求出错,错误原因为:', e)
                })
            }
        }

        // axios.get(fakeDataUrl, { responseType: 'json' }).then((res) => {
        //     console.log('返回的结果为:')
        //     console.log(res)
        //     callback(res.data)
        // })
    };

    loadGithubInfoUseLink = async (link: string): Promise<Object | null> => {
        //每个 link 都是包含 `github.com` 的字符串
        let loc = link.search('github.com')
        let info = link.substr(loc)
        let infoArr = info.split("/")
        if (infoArr.length < 3) {
            return null
        }
        console.log('切分之后的结果数组为:', infoArr)
        let resourceUrl = `https://api.github.com/repos/${infoArr[1]}/${infoArr[2]}/stats/participation`
        let res = await axios.get(resourceUrl, { responseType: 'json' })

        console.log('根据资源名拉取的结果为:', res)

        return {
            author: infoArr[1],
            repo: infoArr[2],
            link: link,
            all: res.data.all,
            owner: res.data.all,
            status: true
        }
    }

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} } as never))),
        });
        this.getData((res: any) => {
            console.log('运行了回调函数')
            const data = this.state.data.concat(res);
            this.setState(
                {
                    data,
                    list: data,
                    loading: false,
                },
                () => {
                    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                    // In real scene, you can using public method of react-virtualized:
                    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                    window.dispatchEvent(new Event('resize'));
                },
            );
        });
    };

    render() {
        const { initLoading, list } = this.state;

        switch (this.props.page) {
            case 1:
                break;
            case 2:
                fetch('./introduction.md').then((res) => {
                    res.text().then((t) => {
                        this.setState({
                            mdInfo: t
                        })
                    })
                })
                //https://github.com/rexxars/react-markdown
                return <ReactMarkdown source={this.state.mdInfo} className={'markdown-style'} />
            case 3:
                return <div>Hello world</div>
            default:
                break
        }

        return (
            <div className={'App-section-detail '}>
                <ListFunc initLoading={initLoading} list={list} />
            </div>

        );


        // const loadMore =
        //     !initLoading && !loading ? (
        //         <div
        //             style={{
        //                 textAlign: 'center',
        //                 marginTop: 12,
        //                 height: 32,
        //                 lineHeight: '32px',
        //             }}
        //         >
        //             <Button onClick={this.onLoadMore}>loading more</Button>
        //         </div>
        //     ) : null;


    }
}

function ListFunc(props: any) {
    let match = useRouteMatch();
    return (

        <Switch>
            <Route path={`${match.path}/:author/:repo`}>
                <div>
                    <Link to={`${match.path}`}><Icon type="arrow-left" /></Link>
                    <ProjectDetail />
                    <Link to={`${match.path}`}>abc</Link>
                    <br />
                    <Link to={`/def`}>def</Link>
                </div>
            </Route>
            <Route path={match.path}>
                <List
                    className="demo-loadmore-list"
                    loading={props.initLoading}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
                    dataSource={props.list}
                    renderItem={(item: any) => (
                        <List.Item
                        // actions={[<a key="list-loadmore-edit" href="/">edit</a>, ]}
                        >
                            <Skeleton avatar title={false} loading={item['loading']} active>
                                <div className="source-name-section">
                                    <a href={`https://github.com/${item['author']}/${item['repo']}`}>
                                        {item['author']}/{item['repo']}
                                    </a>

                                </div>
                                <Series all={item['all']} owner={item['owner']}></Series>

                                <div className="link-area-style"><Link to={`${match.path}/${item['author']}/${item['repo']}}`}>Details</Link></div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Route>
        </Switch>
    )
}