interface KeyboardKeyProps {
    value: string;
}


export const KeyboardKey = ({ value }: KeyboardKeyProps) => {
    return (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">{value}</span>
    </kbd>
    );
}

export const KeyCombo = ({ keys }: { keys: string[] }) => {
    return (
    <div className="flex gap-1">
        {keys.map((key, index) => (
        <KeyboardKey key={index} value={key} />
        ))}
    </div>
    );
}