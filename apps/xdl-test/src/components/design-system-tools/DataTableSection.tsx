"use client";

import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DataTable,
  ColumnFilterConfig,
  EditableDescription,
  SearchableDropdown,
  Select,
} from "@/components/ui/data-table";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  startDate: string;
  salary: string;
}

const roleOptions = [
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Data Scientist",
  "QA Engineer",
  "DevOps Engineer",
  "UX Researcher",
  "Backend Engineer",
  "Frontend Engineer",
  "Engineering Manager",
  "Product Designer",
  "Technical Writer",
  "Security Engineer",
  "Data Analyst",
];

const departmentOptions = ["Engineering", "Design", "Product"];

const initialData: Employee[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Software Engineer",
    department: "Engineering",
    startDate: "15 Jan 2022",
    salary: "140,000",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Product Manager",
    department: "Product",
    startDate: "3 Mar 2021",
    salary: "135,000",
  },
  {
    id: 3,
    name: "Carol Williams",
    role: "Designer",
    department: "Design",
    startDate: "22 Jun 2023",
    salary: "105,000",
  },
  {
    id: 4,
    name: "David Brown",
    role: "Data Scientist",
    department: "Engineering",
    startDate: "8 Sep 2020",
    salary: "140,000",
  },
  {
    id: 5,
    name: "Eva Martinez",
    role: "QA Engineer",
    department: "Engineering",
    startDate: "14 Feb 2024",
    salary: "95,000",
  },
  {
    id: 6,
    name: "Frank Lee",
    role: "DevOps Engineer",
    department: "Engineering",
    startDate: "1 Nov 2021",
    salary: "130,000",
  },
  {
    id: 7,
    name: "Grace Kim",
    role: "UX Researcher",
    department: "Design",
    startDate: "19 Apr 2023",
    salary: "110,000",
  },
  {
    id: 8,
    name: "Henry Chen",
    role: "Backend Engineer",
    department: "Engineering",
    startDate: "7 Jul 2022",
    salary: "125,000",
  },
  {
    id: 9,
    name: "Iris Patel",
    role: "Frontend Engineer",
    department: "Engineering",
    startDate: "30 Aug 2021",
    salary: "118,000",
  },
  {
    id: 10,
    name: "Jack Wilson",
    role: "Engineering Manager",
    department: "Engineering",
    startDate: "12 May 2019",
    salary: "160,000",
  },
  {
    id: 11,
    name: "Karen Davis",
    role: "Product Designer",
    department: "Design",
    startDate: "25 Oct 2022",
    salary: "115,000",
  },
  {
    id: 12,
    name: "Leo Garcia",
    role: "Software Engineer",
    department: "Engineering",
    startDate: "6 Jan 2024",
    salary: "110,000",
  },
  {
    id: 13,
    name: "Mia Thompson",
    role: "Technical Writer",
    department: "Product",
    startDate: "18 Mar 2023",
    salary: "90,000",
  },
  {
    id: 14,
    name: "Nathan Moore",
    role: "Security Engineer",
    department: "Engineering",
    startDate: "2 Dec 2020",
    salary: "145,000",
  },
  {
    id: 15,
    name: "Olivia Taylor",
    role: "Product Manager",
    department: "Product",
    startDate: "11 Jul 2021",
    salary: "140,000",
  },
  {
    id: 16,
    name: "Paul Anderson",
    role: "Software Engineer",
    department: "Engineering",
    startDate: "28 Sep 2022",
    salary: "122,000",
  },
  {
    id: 17,
    name: "Quinn Roberts",
    role: "Designer",
    department: "Design",
    startDate: "5 Feb 2024",
    salary: "100,000",
  },
  {
    id: 18,
    name: "Rachel White",
    role: "Data Analyst",
    department: "Engineering",
    startDate: "16 Jun 2023",
    salary: "98,000",
  },
  {
    id: 19,
    name: "Sam Harris",
    role: "DevOps Engineer",
    department: "Engineering",
    startDate: "23 Nov 2021",
    salary: "128,000",
  },
  {
    id: 20,
    name: "Tina Clark",
    role: "QA Engineer",
    department: "Engineering",
    startDate: "9 Apr 2022",
    salary: "96,000",
  },
  {
    id: 21,
    name: "Uma Nguyen",
    role: "Frontend Engineer",
    department: "Engineering",
    startDate: "20 Aug 2023",
    salary: "115,000",
  },
  {
    id: 22,
    name: "Victor Scott",
    role: "Backend Engineer",
    department: "Engineering",
    startDate: "4 Jan 2021",
    salary: "132,000",
  },
  {
    id: 23,
    name: "Wendy Hall",
    role: "UX Researcher",
    department: "Design",
    startDate: "13 Oct 2022",
    salary: "108,000",
  },
  {
    id: 24,
    name: "Xavier Adams",
    role: "Engineering Manager",
    department: "Engineering",
    startDate: "27 May 2020",
    salary: "155,000",
  },
  {
    id: 25,
    name: "Yara Baker",
    role: "Product Designer",
    department: "Design",
    startDate: "10 Mar 2024",
    salary: "112,000",
  },
];

const columnHelper = createColumnHelper<Employee>();

const columnFilterConfig: ColumnFilterConfig = {
  name: { type: "text" },
  role: { type: "text" },
  department: {
    type: "multiSelect",
    options: ["Engineering", "Design", "Product"],
  },
  startDate: { type: "date" },
  salary: { type: "number" },
};

export default function DataTableSection() {
  const [data, setData] = useState(initialData);

  const updateRole = (id: number, role: string) => {
    setData((prev) => prev.map((e) => (e.id === id ? { ...e, role } : e)));
  };

  const updateDepartment = (id: number, department: string) => {
    setData((prev) =>
      prev.map((e) => (e.id === id ? { ...e, department } : e))
    );
  };

  const updateSalary = (id: number, salary: string) => {
    setData((prev) => prev.map((e) => (e.id === id ? { ...e, salary } : e)));
  };

  const columns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <SearchableDropdown
          options={roleOptions}
          value={info.getValue()}
          onChange={(val) => updateRole(info.row.original.id, val)}
          placeholder="Select role"
        />
      ),
      size: 200,
    }),
    columnHelper.accessor("department", {
      header: "Department",
      cell: (info) => (
        <Select
          options={departmentOptions}
          value={info.getValue()}
          onChange={(val) => updateDepartment(info.row.original.id, val)}
          placeholder="Select department"
        />
      ),
      size: 180,
    }),
    columnHelper.accessor("startDate", { header: "Start Date" }),
    columnHelper.accessor("salary", {
      header: "Salary",
      cell: (info) => (
        <EditableDescription
          value={info.getValue()}
          onChange={(val) => updateSalary(info.row.original.id, val)}
        />
      ),
      size: 150,
    }),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Table</CardTitle>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={columns}
          data={data}
          lockedColumns={["name"]}
          columnFilters={columnFilterConfig}
        />
      </CardContent>
    </Card>
  );
}
