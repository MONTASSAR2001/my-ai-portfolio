export function Skills() {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: ['C/C++', 'Python', 'MATLAB', 'Assembly (ARM/x86)', 'Verilog/VHDL']
    },
    {
      category: 'Software & Tools',
      skills: ['Git/GitHub', 'Embedded Linux', 'RTOS (FreeRTOS)', 'VS Code', 'Jupyter']
    },
    {
      category: 'Communications Protocols',
      skills: ['Serial (UART/SPI/I2C)', 'CAN Bus', 'Ethernet', 'WiFi/Zigbee', 'Modbus']
    },
    {
      category: 'Signal Processing',
      skills: ['DSP (FIR/IIR Filters)', 'FFT Analysis', 'Modulation Schemes', 'Adaptive Algorithms']
    }
  ]

  return (
    <section className="space-y-12">
      <div className="border-b-4 border-accent pb-6">
        <h2 className="text-3xl font-bold tracking-tight">Software & Technical Skills</h2>
      </div>

      <div className="space-y-12">
        {skillCategories.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-muted-foreground">
              {group.category}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {group.skills.map((skill, i) => (
                <div
                  key={i}
                  className="bg-secondary text-foreground px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary text-primary-foreground p-8 space-y-4">
        <h3 className="text-lg font-bold">Continuous Learning</h3>
        <p className="text-sm leading-relaxed">
          Currently pursuing certifications in 5G network architecture and advanced embedded systems design. Active contributor to open-source DSP libraries.
        </p>
      </div>
    </section>
  )
}
