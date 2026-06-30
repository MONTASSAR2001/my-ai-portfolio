export function Hardware() {
  const hardwareTools = [
    {
      category: 'Microcontrollers & Processors',
      items: ['STM32 Series (ARM Cortex-M)', 'NXP LPC Series', 'NVIDIA Jetson Nano', 'Arduino/PIC']
    },
    {
      category: 'Development & Testing',
      items: ['Oscilloscope (Rigol DS1074Z)', 'Function Generator', 'Logic Analyzer', 'Multimeter']
    },
    {
      category: 'RF & Communications Hardware',
      items: ['SDR (Software Defined Radio)', 'Signal Generator', 'Spectrum Analyzer', 'Network Analyzer']
    },
    {
      category: 'Design & Layout Tools',
      items: ['Altium Designer', 'KiCAD', 'Freescale CodeWarrior', 'Vivado (Xilinx)']
    },
    {
      category: 'Prototyping & Testing',
      items: ['Soldering Station', 'Hot Air Rework', 'Breadboards/PCB Prototyping', 'BNC/SMA Connectors']
    }
  ]

  return (
    <section className="space-y-12">
      <div className="border-b-4 border-accent pb-6">
        <h2 className="text-3xl font-bold tracking-tight">Hardware Tools & Equipment</h2>
      </div>

      <div className="space-y-8">
        {hardwareTools.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-muted-foreground">
              {group.category}
            </h3>
            <div className="space-y-2">
              {group.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 border border-border hover:border-accent transition-colors"
                >
                  <span className="text-accent font-bold mt-1">◆</span>
                  <span className="text-sm text-foreground/85">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary text-primary-foreground p-8 space-y-4">
        <h3 className="text-lg font-bold">Lab Environment</h3>
        <p className="text-sm leading-relaxed">
          Equipped with a comprehensive embedded systems laboratory featuring industry-standard test equipment and design tools. Experience spans circuit design, PCB layout, and real-time hardware debugging.
        </p>
      </div>
    </section>
  )
}
