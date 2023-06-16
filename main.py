from qiskit import QuantumCircuit, Aer, transpile
from collections import defaultdict
import matplotlib.pyplot as plt


def get_random_numbers(n: int, sim) -> list:
    random_generator_qc = QuantumCircuit(1)
    random_generator_qc.h(0)
    random_generator_qc.measure_all()
    compiled_qc = transpile(random_generator_qc, sim)
    return [int(item) for item in sim
            .run(compiled_qc, shots=n, memory=True)
            .result()
            .get_memory()]


sim = Aer.get_backend("aer_simulator")


def n():
    arr = get_random_numbers(8, sim)
    arr = [str(x) for x in arr]
    s = "".join(arr)
    i = int(s, 2)
    return i


bins = [0 for _ in range(16)]
print(bins)
for count in range(10000):
    if (count % 100 == 0):
        print(count)

    i = n()
    q = i // 16
    r = i % 16

    try:
        bins[q] += 1
    except IndexError:
        print(i)
        print(q, r)
        print(f"bins[{q}]", bins[q])

x = range(16)
y = bins

plt.scatter(x, y, label=y)
ax = plt.gca()
ax.set_ylim([0, 700])
plt.show()
