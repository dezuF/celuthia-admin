"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link";

export const columns: ColumnDef<CollectionType>[] = [//collectiontype es del archivo lib:types.d.ts
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (<Link href={`/collections/${row.original._id}`} className="hover:text-red-1">{row.original.title}</Link>)
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => <p>{row.original.products.length}</p>
    },
    {
      id: "actions",
      cell: ({ row }) => <Delete id={row.original._id}/> //en custom ui creamos Delete
    },
  ];