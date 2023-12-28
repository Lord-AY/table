import { Component, ElementRef } from '@angular/core'
import { CommonModule } from '@angular/common'

import {
  FlexRender,
  flexRender,
  getCoreRowModel,
  createAngularTable,
  createColumnHelper,
} from '@tanstack/angular-table'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const data: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('firstName', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => 'Last Name',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => 'Visits',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: info => info.column.id,
  }),
]

@Component({
  selector: 'basic-example',
  standalone: true,
  template: `
    <table>
      <thead>
        @for( headerGroup of table.getHeaderGroups(); track headerGroup.id){
        <tr>
          @for( header of headerGroup.headers; track header.id){
          <th #thRef>
            @if (!header.isPlaceholder) {
            {{
              flexRender(
                header.column.columnDef.header,
                header.getContext(),
                thRef
              )
            }}
            }
          </th>
          }
        </tr>
        }
      </thead>
      <tbody>
        @for( row of table.getRowModel().rows; track row.id){
        <tr>
          @for( cell of row.getVisibleCells(); track cell.id){
          <td #tdRef>
            {{
              flexRender(cell.column.columnDef.cell, cell.getContext(), tdRef)
            }}
          </td>
          }
        </tr>
        }
      </tbody>
      <tfoot>
        @for( footerGroup of table.getFooterGroups(); track footerGroup.id){
        <tr>
          @for( header of footerGroup.headers; track header.id){
          <th #thRef>
            @if (!header.isPlaceholder) {
            {{
              flexRender(
                header.column.columnDef.footer,
                header.getContext(),
                thRef
              )
            }}
            }
          </th>
          }
        </tr>
        }
      </tfoot>
    </table>
  `,
  imports: [CommonModule],
})
export class BasicExampleComponent {
  table = createAngularTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  flexRender<TProps extends {}>(Comp: any, props: TProps, ref: any) {
    return flexRender(Comp, props, ref)
  }
}
