import sys

def check_arguments():
    # sys.argv[0] is the script name; arguments start from index 1
    arguments = sys.argv[1:]
    print("Received arguments:", arguments)

if __name__ == "__main__":
    check_arguments()
