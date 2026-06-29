"use client"

import * as React from "react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type ChartConfig as RechartsChartConfig,
  type ChartData as RechartsChartData,
} from "recharts"

type ChartProps = React.ComponentProps<typeof ChartContainer> & {
  config: ChartConfig
  data: RechartsChartData
}

type ChartVariant = "bar" | "line" | "area" | "pie" | "radial"

const Chart = ({ config, data, ...props }: ChartProps) => {
  const [activeChart, setActiveChart] =
    React.useState<ChartVariant>("bar")

  const total = React.useMemo(
    () => data.reduce((acc: number, curr: any) => acc + curr[activeChart], 0),
    [data, activeChart]
  )

  return (
    <ChartContainer
      config={config}
      className="min-h-[200px] w-full"
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-9 items-center justify-center gap-2">
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          {Object.keys(config).map((key) => {
            if (key === "total") {
              return null
            }

            const { label, color } = config[key]
            return (
              <Button
                key={key}
                data-active={activeChart === key}
                className="group h-9 w-fit gap-1 rounded-full bg-white/10 text-tiny text-foreground data-[active=true]:bg-white/10"
                variant="outline"
                onClick={() => setActiveChart(key as ChartVariant)}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: `hsl(var(${color}))`,
                  }}
                />
                <span className="text-muted-foreground group-hover:text-foreground">
                  {label}
                </span>
              </Button>
            )
          })}
        </div>
        <div className="grid auto-rows-min grid-cols-1 items-center gap-1 text-sm">
          <Label className="text-muted-foreground">Total</Label>
          <Label className="text-xl font-bold tabular-nums">
            {total.toLocaleString()}
          </Label>
        </div>
      </div>
    </ChartContainer>
  )
}

export { Chart }
