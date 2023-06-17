from qiskit import QuantumCircuit, Aer, transpile
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

aer_simulator = Aer.get_backend("aer_simulator")


def get_random_numbers(n: int, sim) -> list:
    random_generator_qc = QuantumCircuit(1)
    random_generator_qc.h(0)
    random_generator_qc.measure_all()
    compiled_qc = transpile(random_generator_qc, sim)
    return [int(item) for item in sim
            .run(compiled_qc, shots=n, memory=True)
            .result()
            .get_memory()]


def generate_num():
    arr = get_random_numbers(8, aer_simulator)
    arr = [str(x) for x in arr]
    s = "".join(arr)
    i = int(s, 2)
    return i


def binNums(n):
    bins = [0 for _ in range(16)]
    for count in range(n):
        i = generate_num()
        q = i // 16
        r = i % 16

        try:
            bins[q] += 1
        except IndexError:
            print(i)
            print(q, r)
            print(f"bins[{q}]", bins[q])

    return bins


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/{n}", tags=["read_root"])
def read_root(n):
    bins = binNums(int(n))
    return {"bins": bins}
