import React from 'react'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
    Guide,
} from 'bizcharts'

const { Line } = Guide;

interface SeriesProps {
    all: [number],
    owner: [number],
}

export class Series extends React.Component<SeriesProps, {}> {
    // constructor(props: SeriesProps) {
    //     super(props)
    // }

    render() {
        let data: Object[] = []
        for (let i = 0; i < this.props.all.length; i++) {
            data = data.concat([
                {
                    month: i,
                    role: 'all',
                    revenue: this.props.all[i]
                },
                {
                    month: i,
                    role: 'owner',
                    revenue: this.props.owner[i]
                },
            ])

        }
        const cols = {
            month: {
                range: [0, 1],
            },
        };
        return (
            <div>
                <Chart height={200} data={data} scale={cols} forceFit className="series-style">
                    <Legend />
                    <Axis name="month"
                        title={null}
                        tickLine={null}
                        line={{
                            stroke: "#E6E6E6"
                        }}
                    />
                    <Axis
                        name="revenue"
                        label={{
                            formatter: val => `${val}`,
                        }}
                        line={null}
                        tickLine={null}
                        grid={null}
                        title={null}
                    />
                    <Tooltip
                        crosshairs={{
                            type: 'y',
                        }}
                    />
                    <Geom type="line" position="month*revenue" size={2} color={'role'} shape="smooth" />

                    {/* <Geom type="line" position="month*revenue"
                        size={2}
                        color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                        shape="smooth"
                        style={{
                            shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                            shadowBlur: 60,
                            shadowOffsetY: 6
                        }}
                    /> */}
                    {/* <Geom
                        type="point"
                        position="month*revenue"
                        size={4}
                        shape={'circle'}
                        color={'role'}
                        style={{
                            stroke: '#fff',
                            lineWidth: 1,
                        }}
                    /> */}
                </Chart>
            </div >
        );
    }
}
