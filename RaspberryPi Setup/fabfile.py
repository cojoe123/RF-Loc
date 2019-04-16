# python file used by fabric
from fabric import task, ThreadingGroup

det_group = ThreadingGroup("pi@detector-1", "pi@detector-2", "pi@detector-3", "pi@detector-4")

# testing purposes
@task
def hello(det_group):
    det_group.run('echo Hello World')

# print current working directory across each raspberry pi
@task
def printWorkingDirectory(det_group):
    hostname = det_group.run('hostname').stdout.strip()
    dir = det_group.run('pwd').stdout.strip()
    print('Current working directory for {0} is {1}'.format(hostname, dir))
    
@task
def shutDown(det_group):
        det_group.run('sudo shutdown -h now')

@task
def begin(det_group):
        det_group.run('cd csc480/RaspberryPi\ Setup/ && sudo sh RFLoc.sh')
        

        
