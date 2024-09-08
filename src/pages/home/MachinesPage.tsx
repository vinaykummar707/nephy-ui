import {Button} from "@/components/ui/button";
import useDialysisUnitStore from "@/store/useDialysisUnitStore";
import useHospitalStore from "@/store/useHospitalStore";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {Add, BoxSearch, Refresh} from "iconsax-react";
import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";

const MachinesPage = () => {
    const {activeDialysisUnit} = useDialysisUnitStore();
    const {hospital} = useHospitalStore();
    const [machines, setMachines] = useState([]);

    const getMachinesByUnitId = async () => {
        return (
            await axios.get(
                `http://localhost:3000/dialysis-machines/${activeDialysisUnit?._id}`
            )
        ).data;
    };
    const machinesQuery = useMutation({
        mutationKey: ["get machines"],
        mutationFn: getMachinesByUnitId,
        onSuccess: (data) => {
            if (data?.machines.length > 0) setMachines(data.machines);
        },
    });

    const addMachine = async () =>
        await axios.post(
            "http://localhost:3000/dialysis-machine",
            JSON.stringify({
                hospitalId: hospital?._id,
                dialysisUnitId: activeDialysisUnit?._id,
            }),
            {
                headers: {"Content-Type": "application/json"},
            }
        );

    const addMachineMutation = useMutation({
        mutationKey: ["add machine"],
        mutationFn: addMachine,
        onSuccess() {
            machinesQuery.mutate();
        },
    });

    useEffect(() => {
        if (hospital && activeDialysisUnit) machinesQuery.mutate();
    }, [hospital, activeDialysisUnit]);

    const onAddMachineClick = () => {
        addMachineMutation.mutate();
    };

    const onRefreshClick = () => {
        machinesQuery.mutate();
    };

    const statusColors = (status: string) => {
        switch (status) {
            case "available":
                return {color: "bg-green-300 text-green-900", text: "Available"};
            case "dialysis":
                return {
                    color: "bg-yellow-300 text-yellow-900",
                    text: "Under Dialysis",
                };
            case "cleaning":
                return {
                    color: "bg-purple-300 text-purple-900",
                    text: "Cleaning Machine",
                };
        }
    };

    const data = {

        series: [50],
        options: {
            chart: {
                type: 'radialBar',
            },
            colors: ['#fff'],
            plotOptions: {
                radialBar: {
                    track: {
                        background:"#000"
                    },
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                return 5
                            }
                        }
                    }
                }
            },
            labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
        },


    };


    return (
        <div className="flex-1 flex flex-col p-8 overflow-auto bg-zinc-100">
            {machines.length == 0 && (
                <div className="bg-white gap-4 flex-1  rounded-lg flex flex-col p-6">
                    <div className="flex-1 flex flex-col  gap-4 justify-center items-center">
                        <BoxSearch size={48} className="text-neutral-500" variant="Bulk"/>
                        <div className="flex justify-center gap-1 items-center w-[28%] flex-col">
                            <h1 className="text-md  font-[500]">No Machines Found</h1>
                            <h1 className="text-xs  font- text-neutral-400  text-center">
                                Please add machines to the dialysis unit to make dialysis
                                running for the patients
                            </h1>
                        </div>
                        <Button onClick={onAddMachineClick} size={"sm"}>
                            <Add className="mr-0.5"/> Add New Machine
                        </Button>
                        {/*<Button variant={"ghost"} onClick={onRefreshClick} size={"sm"}>*/}
                        {/*    <Refresh size={14} className="mr-0.5"/> Refresh Data*/}
                        {/*</Button>*/}
                    </div>
                </div>
            )}
            {machines.length > 0 && (
                <div className={"flex flex-col gap-4"}>
                    <div className="flex  items-center justify-between">
                        <h1 className="font-extrabold text-2xl">Machines</h1>
                        <div className="flex items-center gap-2">
                            <Button onClick={onAddMachineClick} size={"sm"}>
                                <Add size={18} className="mr-1 text-white"/> Add Machine
                            </Button>
                            <Button
                                variant={"secondary"}
                                onClick={onRefreshClick}
                                size={"sm"}
                            >
                                <Refresh size={16} className="mr-2"/>
                                Refresh
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 ">
                        <div className="bg-white   p-4 flex flex-col  gap-4 rounded-2xl">
                            <h1 className="text-sm font-medium">Overall Activity</h1>
                            <Chart
                                options={data.options}
                                series={data.series}
                                type="radialBar"
                            />

                        </div>
                    </div>

                    {/* <div
                    className="bg-white p-4 gap-6 justify-start items-start  rounded-xl  flex flex-col ">
                    <h1 className="text-sm font-medium">Showing All Machines</h1>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-neutral-50">
                                <TableHead>Number</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Occupied</TableHead>
                                <TableHead>Last Modified</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {machines && machines.map((machine) => (
                                <TableRow className={""} key={machine.machine}>
                                    <TableCell className="font-medium">
                                        Machine No {machine.machineNo}
                                    </TableCell>
                                    <TableCell>{machine.dialysisUnitId.unitName}</TableCell>
                                    <TableCell> <Badge
                                        className={`${statusColors(machine.status).color}`}>
                                        {statusColors(machine.status).text}</Badge>
                                    </TableCell>
                                    <TableCell className={""}>
                                        {machine.isOccupied ? <>

                                            <div className="flex items-center gap-2">
                                                <Avvvatars size={30} style="character" value={'william smith'}/>


                                                <p className="">Robert Williams</p>

                                            </div>

                                        </> : ""}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(machine.updatedAt), 'PP')}
                                    </TableCell>
                                    <TableCell className="text-right">

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div> */}
                </div>
            )}
        </div>
    );
};

export default MachinesPage;
