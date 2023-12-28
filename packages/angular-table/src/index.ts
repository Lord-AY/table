import {
  Component,
  ComponentRef,
  ViewContainerRef,
  effect,
  inject,
  signal,
} from '@angular/core'
import {
  Table,
  RowData,
  createTable,
  TableOptions,
  TableOptionsResolved,
} from '@tanstack/table-core'

export * from '@tanstack/table-core'

// export class FlexRender {
//   public flexRender(Comp: any, props: any, viewContainerRef: ViewContainerRef) {
//     if (!Comp) return

//     // If Comp is a string or a simple type, return it directly.
//     if (typeof Comp !== 'function') {
//       return Comp
//     }

//     // Assuming Comp is a component class
//     const componentRef: ComponentRef<Component> =
//       viewContainerRef.createComponent(Comp)

//     // Assign props to the instance of the component
//     Object.assign(componentRef.instance, props)

//     return componentRef
//   }
// }

export function flexRender<TProps extends {}>(Comp: any, props: TProps) {
  if (!Comp) return null
  console.log(Comp)
  // console.log(Comp, props)
  if (typeof Comp === 'function') {
    return Comp(props)
  }

  return Comp
}

export function createAngularTable<TData extends RowData>(
  options: TableOptions<TData>
): Table<TData> {
  const resolvedOptions: TableOptionsResolved<TData> = {
    state: {}, // Dummy state
    onStateChange: () => {}, // noop
    renderFallbackValue: null,
    ...options,
  }

  const table = createTable(resolvedOptions)
  // Always set state to initialState
  // https://github.com/TanStack/table/issues/4358

  const state = signal(table.initialState)

  table.setOptions(prev => ({
    ...prev,
    ...options,
    state: {
      ...state(),
      ...options.state,
    },
    onStateChange: updater => {
      if (updater instanceof Function) {
        state.update(prev => updater(prev))
      } else {
        state.set(updater)
      }
      options.onStateChange?.(updater)
    },
  }))

  effect(() => {
    return table.setOptions(prev => ({
      ...prev,
      ...options,
      state: {
        ...state(),
        ...options.state,
      },
      onStateChange: updater => {
        if (updater instanceof Function) {
          state.update(prev => updater(prev))
        } else {
          state.set(updater)
        }
        options.onStateChange?.(updater)
      },
    }))
  })

  return table
}
