import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useMemo, ComponentType, useEffect, useState } from 'react'
import { FieldRenderProps, FieldProps, Field } from 'react-final-form'

export type Props<T> = {
  position?: 'vertical' | 'horizon' | 'table'
} & FieldRenderProps<T>

export const modifyComponent =
  (Component: ComponentType<any>, width = '100%') =>
  (props: Omit<Props<any>, 'onBlur'>) => {
    const {
      input,
      meta,
      onChange,
      onBlur,
      label,
      position = 'horizon',
      // hideErrorLabel = false,
      dataDiff,
      nameDiff,
      title,
      required,
      dataTable,
      ...restProps
    } = props

    const { error, touched, data } = meta

    const iserror = useMemo(() => {
      return error && touched
    }, [error, touched])

    const [isDiff, setIsDiff] = useState<boolean>(false)
    const [rowDiff, setRowDiff] = useState<string[]>([])

    useEffect(() => {
      if (dataDiff) {
        const splitName = input.name.split('.')
        let realName = splitName[0]
        if (splitName.length > 1) {
          realName = splitName[1]
        }

        if (position === 'table') {
          const rowDiffTemp = dataDiff
            ?.filter((x: string) => x.indexOf(nameDiff) > -1 && x.slice(-1) !== 's')
            ?.map((x: string) => x.slice(-1))

          if (rowDiffTemp?.length > 0) {
            setIsDiff(true)
            setRowDiff(rowDiffTemp)
          }
        } else if (position === 'tableAccount' && dataDiff.includes(realName)) {
          const rowDiffTemp = dataTable?.map((_: any, index: number) => index.toString())

          setIsDiff(true)
          setRowDiff(rowDiffTemp)
        } else if (dataDiff.includes(realName)) {
          setIsDiff(true)
        } else setIsDiff(false)
      }
    }, [input.name, dataDiff, position, nameDiff, dataTable, props])

    const renderWithTable = () => {
      return (
        <Box
          display="flex"
          gap="8px"
          flexDirection="column"
          width="100%"
          alignItems={'start'}
          textAlign={'start'}
          id={isDiff ? 'diff' : ''}
        >
          <Component
            {...input}
            {...restProps}
            data={dataTable}
            style={{ width: '100%' }}
            rowDiff={rowDiff}
            titleTable={
              <Typography
                variant="body1"
                fontSize={16}
                fontWeight={500}
                sx={isDiff ? { mr: 'auto', color: 'error.main' } : { mr: 'auto' }}
                alignSelf={'center'}
              >
                {title} {required && <label style={{ color: 'red ' }}>*</label>}
              </Typography>
            }
          />

          {iserror && (
            <Box display="flex" flexDirection="row" justifyContent={'start'} sx={{ marginTont: '4px' }}>
              <Typography color="red">{error}</Typography>
            </Box>
          )}
        </Box>
      )
    }

    const renderWithVertical = () => {
      return (
        <Box
          display="flex"
          gap="8px"
          flexDirection="column"
          width="100%"
          alignItems={'start'}
          textAlign={'start'}
          id={isDiff ? 'diff' : ''}
        >
          <Component
            {...input}
            label={label ?? ''}
            onChange={(v: any) => {
              input.onChange(v)
              onChange?.(v)
            }}
            onBlur={(v: any) => {
              onBlur?.(v)
              input.onBlur(v)
            }}
            error={iserror}
            iserror={iserror?.toString()} // แปลงเป็น string ก่อนส่ง
            meta={meta}
            data={data}
            isDiff={isDiff}
            {...restProps}
            style={{ width: '100%' }}
          />

          {iserror && (
            <Box display="flex" flexDirection="row" justifyContent={'start'} sx={{ marginTont: '4px' }}>
              <Typography color="red">{error}</Typography>
            </Box>
          )}
        </Box>
      )
    }

    const renderWithHorizon = () => {
      return (
        <Box display="flex" flexDirection="column" gap={'8px'} width="100%">
          <Box width="100%" justifyContent={'center'} alignItems={'start'} display="flex" flexDirection="row" gap={2}>
            <Box
              sx={{
                minWidth: '35%', // ความกว้างคงที่ของ Label
                textAlign: 'right',
              }}
            >
              <Typography color={iserror || isDiff ? 'red' : grey[800]} variant="subtitle1" sx={{ mt: '14px' }}>
                {label} {required && <label style={{ color: 'red ' }}>*</label>}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }} id={isDiff ? 'diff' : ''}>
              <Component
                {...input}
                onChange={(v: any) => {
                  input.onChange(v)
                  onChange?.(v)
                }}
                onBlur={(v: any) => {
                  onBlur?.(v)
                  input.onBlur(v)
                }}
                error={iserror}
                isDiff={isDiff}
                iserror={iserror?.toString()} // แปลงเป็น string ก่อนส่ง
                meta={meta}
                {...restProps}
                style={{ width: '390px' }}
              />
              <Box
                sx={{
                  minWidth: '35%', // ความกว้างคงที่ของ Label
                  textAlign: 'right',
                }}
              ></Box>
            </Box>
          </Box>
          <Box width="100%" justifyContent={'center'} alignItems={'center'} display="flex" flexDirection="row" gap={2}>
            <Box
              sx={{
                minWidth: '35%', // ความกว้างคงที่ของ Label
                textAlign: 'right',
              }}
            ></Box>
            <Box sx={{ flex: 1 }}>
              {iserror && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Typography color="red">{error}</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )
    }

    if (position === 'vertical') {
      return renderWithVertical()
    } else if (position === 'table') {
      return renderWithTable()
    } else {
      return renderWithHorizon()
    }
  }

type CustomFieldProps = {
  hideErrorLabel?: boolean
}

// export const makeField = <T,>(component: ComponentType<any>, width?: string) => {
//   const newComponent = modifyComponent(component, width)
//   return (props: FieldProps<string, Props<string>> & T & CustomFieldProps) => <Field {...props} render={newComponent} />
// }

export const makeField = <T,>(component: ComponentType<any>, width?: string) => {
  const newComponent = modifyComponent(component, width)
  return (props: FieldProps<string, Props<string>> & T & CustomFieldProps) => <Field {...props} render={newComponent} />
}
