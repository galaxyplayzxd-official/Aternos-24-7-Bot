import subprocess
import time
import sys

NODE_COMMAND = ["node", "bot.js"]
RESTART_DELAY = 5

print("🐍 Python watchdog started")

while True:
    try:
        print("🚀 Starting Node bot...")
        process = subprocess.Popen(NODE_COMMAND)
        process.wait()

        print(f"⚠️ Bot stopped. Restarting in {RESTART_DELAY}s")
        time.sleep(RESTART_DELAY)

    except KeyboardInterrupt:
        print("\n🛑 Watchdog stopped")
        sys.exit(0)

    except Exception as e:
        print("❌ Watchdog error:", e)
        time.sleep(RESTART_DELAY)
