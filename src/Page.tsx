import React from 'react';
import { Menu, Icon } from 'antd';

import { SectionDetail } from './LinkList'

const { SubMenu } = Menu;

const stateMap = new Map()
stateMap.set("Home", 1)
stateMap.set("Introduction", 2)
stateMap.set("Setting", 3)

export class Page extends React.Component<any, { current: string }> {
    state = {
        current: 'Home'
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <div className={'common-header'}>
                        <Menu onClick={() => { }} selectedKeys={[this.state.current]} mode="horizontal"
                            theme={'dark'}
                            style={{ background: "transparent" }}
                        >
                            <Menu.Item key="Home" onClick={() => {
                                this.setState({
                                    current: "Home"
                                })
                            }}>
                                <Icon type="home" />
                                Home
                            </Menu.Item>
                            <Menu.Item key="Introduction" onClick={() => {
                                this.setState({
                                    current: "Introduction"
                                })
                            }}>
                                <Icon type="appstore" />
                                Introduction
                            </Menu.Item>
                            <Menu.Item key="Setting" onClick={() => {
                                this.setState({
                                    current: "Setting"
                                })
                            }}>
                                <Icon type="setting" />
                                Setting
                            </Menu.Item>
                            <Menu.Item key="alipay">
                                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                    About author
                                </a>
                            </Menu.Item>
                        </Menu>
                    </div>
                </header>
                <section className="App-section">
                    <SectionDetail page={stateMap.get(this.state.current)}></SectionDetail>
                </section>
            </div >
        )
    }
}